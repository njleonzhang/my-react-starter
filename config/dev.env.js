var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // httpBaseUrl: '"http://139.196.186.245:8080/mockjsdata/1/"'
  httpBaseUrl: '"http://0.0.0.0:8888/"'
})
