const { app, baseURL } = require('../index')
const { generateAccessToken } = require('../utils/auth')

exports = app.post(`${baseURL}/new-user`, (req, res) => {
  // ...
  const token = generateAccessToken({ username: req.body.username })
  res.json({ token })
  // ...
})
