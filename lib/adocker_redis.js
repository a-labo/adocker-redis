/**
 * Define commands for docker redis
 * @function adockerRedis
 * @param {string} name - Container name
 * @param {Object} options - Optional settings
 * @returns {Object}
 */
'use strict'

const {
  logs, remove, run,
  start, stop, inspect
} = require('adocker/commands')
const co = require('co')
const path = require('path')
const { mkdirpAsync } = require('asfs')

const handleError = (err) => {
  console.error(err)
  process.exit(1)
}

/** @lends adockerRedis */
function adockerRedis (name, options = {}) {
  let {
    image = 'redis:latest',
    dataDir = 'var/redis',
    publish = false,
    network = 'default',
    onError = handleError,
    cwd = process.cwd()
  } = options

  dataDir = path.resolve(dataDir)
  let bundle = {
    /**
     * Run redis container
     * @returns {Promise}
     */
    run: (...args) => mkdirpAsync(dataDir)
      .then(() => run({
        name,
        network,
        publish,
        volume: `${dataDir}:/data`,
        detach: true
      }, image, ...args)),
    /**
     * Check if running
     * @returns {Promise.<boolean>}
     */
    isRunning: () => inspect(name).then(([ info ]) => Boolean(info && info.State.Running)),
    /**
     * Check if build
     * @returns {Promise.<boolean>}
     */
    hasContainer: () => inspect(name).then(([ info ]) => !!info),

    hasBuild () {
      console.warn('`hasBuild()` is deprecated. use `hasContainer()` instead.')
      return inspect(name).then(([ info ]) => !!info)
    },

    /**
     * Show logs of redis container
     * @returns {Promise}
     */
    logs: logs.bind(null, name),
    /**
     * Start redis container
     * @returns {Promise}
     */
    start: start.bind(null, name),
    /**
     * Stop redis container
     * @returns {Promise}
     */
    stop: stop.bind(null, name),
    /**
     * Remove redis container
     * @param {Object} [options={}] - Optional settings
     * @param {boolean} [options.force=false] - Force to remove
     * @returns {Promise}
     */
    remove: remove.bind(null, name),
    /**
     * Open terminal of redis container
     * @returns {Promise}
     */
    terminal: run.bind(null, {
      interactive: true,
      tty: true,
      network,
      link: `${name}:redis`,
      rm: true
    }, image, 'sh', '-c', `exec redis-cli -h redis -p 6379`)
  }
  return Object.assign(bundle, {
    cli () {
      return Object.assign({},
        ...Object.keys(bundle).map((name) => ({
          [name]: (...args) => {
            process.chdir(cwd)
            return bundle[ name ](...args).catch(onError)
          }
        }))
      )
    }
  })
}

module.exports = adockerRedis
