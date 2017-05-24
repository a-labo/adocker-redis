/**
 * Test case for adockerRedis.
 * Runs with mocha.
 */
'use strict'

const adockerRedis = require('../lib/adocker_redis.js')
const { equal } = require('assert')
const co = require('co')

describe('adocker-redis', function () {
  this.timeout(500000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Adocker redis', () => co(function * () {
    let redis = adockerRedis('adocker-redis-test-01')

    let { run, remove, logs, stop, isRunning, hasBuild } = redis.cli()

    equal(yield isRunning(), false)
    equal(yield hasBuild(), false)
    yield run()

    equal(yield isRunning(), true)
    equal(yield hasBuild(), true)

    yield logs()

    yield stop()

    equal(yield isRunning(), false)
    equal(yield hasBuild(), true)

    yield remove({ force: true })
  }))
})

/* global describe, before, after, it */
