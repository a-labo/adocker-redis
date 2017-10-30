/**
 * Test case for adockerRedis.
 * Runs with mocha.
 */
'use strict'

const adockerRedis = require('../lib/adocker_redis.js')
const {equal} = require('assert')

describe('adocker-redis', function () {
  this.timeout(500000)

  before(async () => {

  })

  after(async () => {

  })

  it('Adocker redis', async () => {
    let redis = adockerRedis('adocker-redis-test-01')

    let {run, remove, logs, stop, isRunning, hasBuild} = redis.cli()

    equal(await isRunning(), false)
    equal(await hasBuild(), false)
    await run()

    equal(await isRunning(), true)
    equal(await hasBuild(), true)

    await logs()

    await stop()

    equal(await isRunning(), false)
    equal(await hasBuild(), true)

    await remove({force: true})
  })
})

/* global describe, before, after, it */
