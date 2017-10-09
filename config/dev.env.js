var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  httpBaseUrl: '"http://rapapi.org/mockjsdata/20993/"'
})
