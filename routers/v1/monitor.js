const requireDir = require('require-dir')
const router = require('express').Router()
const ctrls = requireDir('../../ctrls')

router.get('/info', ctrls.monitor.fetchMonitor)

module.exports = router
