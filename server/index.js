const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const log4js = require('log4js')
require('dotenv').config()

const app = express()

const logger = log4js.getLogger()
logger.level = 'debug'
exports.logger = logger

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build')))

app.use(cors());

const baseURL = '/api'
exports.baseURL = baseURL
const port = process.env.PORT

app.use(`${baseURL}/user`, require('./routes/user'))
app.use(`${baseURL}/posts`, require('./routes/posts'))

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@portfolio-cluster.1k2ue.mongodb.net/portfolio?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
)
const db = mongoose.connection
db.on('error', () => logger.fatal('DB connection failed'))
db.once('open', () => {
  app.listen(port, () => logger.info(`Server started on port ${port}`))
})
