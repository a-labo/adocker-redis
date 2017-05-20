/**
 * Docker redis utility
 * @module adocker-redis
 * @version 1.0.1
 */

'use strict'

const adockerRedis = require('./adocker_redis')

let lib = adockerRedis.bind(this)

Object.assign(lib, adockerRedis, {
  adockerRedis
})

module.exports = lib
