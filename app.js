const path = require('path')
const http = require('http')
const morgan = require('morgan')
const express = require('express')
const engines = require('consolidate')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const timeout = require('connect-timeout')
const config = require('./config')

const HTTP_PORT = process.env.HTTP_PORT || config.port

morgan.format('log', `[:date[iso]] :method :url :status :response-time ms - :res[content-length] - [:remote-addr]`)

const app = express()

app.use(morgan('dev'))

// view engine setup
app.engine('html', engines.swig)
app.engine('jade', engines.jade)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d' }))

app.use(bodyParser.json({ limit: '500mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }))
app.use(cookieParser())

app.use(timeout('180s'))
app.use(require('compression')())
app.use(require('response-time')())

// 过滤权限
// app.use(auth.verifyAuth)

// 设置路由
app.use(require('./routers/health.js'))
// 过滤权限
require('./routers/v1')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handlers
// development error handler will print stacktrace
// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.error('Error: ', err, err.stack)
  res.status(err.status || 500).json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  })
})


http.createServer(app).listen(HTTP_PORT, function () {
    console.info(`HTTP Server listening on port: ${HTTP_PORT}, in ${app.get('env')}`)
})
