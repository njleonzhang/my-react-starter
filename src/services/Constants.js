const isProduction = process.env.NODE_ENV === 'production'
const noop = function() {}

export {
  isProduction,
  noop
}
