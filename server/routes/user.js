const router = require('express').Router()
const { generateAccessToken } = require('../utils/auth')
const { sendErrorResponse, sendResponse, _idStrippedDoc } = require('../utils/response')
const { addUser, getUserByUsername, comparePassword } = require('../models/user')

function genTokenSendUserRes(res, username, user) {
  const token = generateAccessToken({ username })
  sendResponse(res, { token, ..._idStrippedDoc(user) })
}

router.post('/register', (req, res) => {
  const { username, password } = req.body
  addUser({ username, password }, (user, err) => {
    if (err) {
      sendErrorResponse(res, 500, err)
    } else {
      genTokenSendUserRes(res, username, user)
    }
  })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  getUserByUsername(username, (user, err) => {
    if (err) {
      sendErrorResponse(res, 500, err)
    } else {
      comparePassword(password, user.password, (error, isMatch) => {
        if (error) {
          sendErrorResponse(res, 500, error)
        } else if (isMatch) {
          genTokenSendUserRes(res, username, user)
        } else {
          sendErrorResponse(res, 401, 'Incorrect password')
        }
      })
    }
  })
})

module.exports = router
