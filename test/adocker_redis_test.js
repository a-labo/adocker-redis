/**
 * Test case for adockerRedis.
 * Runs with mocha.
 */
'use strict'

const adockerRedis = require('../lib/adocker_redis.js')
const assert = require('assert')
const co = require('co')

describe('adocker-redis', function () {
  this.timeout(500000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Adocker redis', () => co(function * () {
    let redis = adockerRedis('adocker-redis-test-01')

    let { run, remove, logs } = redis.cli()
    yield run()
    yield logs()
    yield remove({ force: true })
  }))
})

/* global describe, before, after, it */
