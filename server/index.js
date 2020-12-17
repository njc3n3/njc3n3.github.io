const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build')))

const baseURL = '/api'

app.get(`${baseURL}/test`, (req, res) => {
  res.send({ text: `You sent ${req.body.text}` })
})

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'))
})

app.listen(process.env.PORT || 3000, () => console.log('server on'))
