'use strict'

const config = require('../config')

module.exports = (type) => {
  return {
    code: type,
    message: config.errCode[type],
  }
}