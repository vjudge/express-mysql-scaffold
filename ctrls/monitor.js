const _ = require('lodash')
const monitor = require('../models/monitor')

const debug = require('debug')('ctrl:monitor')

exports.fetchMonitor = async function (req, res, next) {
    try {
        let result = await monitor.fetchMonitor()
        res.status(200).json({ code: 0, data: { msg: result } })
    } catch (err) {
        res.status(500).json({ msg: `服务异常` })
    }
}