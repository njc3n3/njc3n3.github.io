const jwt = require('jsonwebtoken')
const { logger } = require('../index')

exports.authenticateToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      logger.error(err)
      return res.sendStatus(403)
    }
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })
}

// username is in the form { username: "my cool username" }
// ^^the above object structure is completely arbitrary
exports.generateAccessToken = username => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}
