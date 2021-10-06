const rootRouter = require('express').Router()
const requireDir = require('require-dir')
const ctrls = requireDir('../../ctrls')

rootRouter.use('/monitor', require('./monitor'))

module.exports = function vRouter (app) {
    app.use('/api/v1', rootRouter)
}
