// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-pxtorem": {
      rootValue: 75,
      propList: ['*']
    },
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {}
  }
}
