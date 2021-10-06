const _ = require('lodash')

const base = {
}

let env = process.env.NODE_ENV || 'development'
const config = require(`./${env}.js`)
module.exports = _.assign({}, base, config)
