const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const log4js = require('log4js')
require('dotenv').config()

const app = express()
exports.app = app

const logger = log4js.getLogger()
logger.level = 'debug'
exports.logger = logger

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build')))

const baseURL = '/api'
exports.baseURL = baseURL
const port = process.env.PORT

const { authenticateToken } = require('./utils/auth.js')

app.get(`${baseURL}/test`, authenticateToken, (req, res) => {
  res.send({ text: `You sent ${req.body.text}` })
})

require('./routes/user')

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'))
})

app.listen(port, () => logger.info(`Server started on port ${port}`))
