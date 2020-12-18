const router = require('express').Router()
const { addPost, getUserPosts, getPost, deletePost, updatePost } = require('../models/posts')
const { sendErrorResponse, sendDataResponse, sendMsgResponse, _idStrippedDoc } = require('../utils/response')
const { authenticateToken } = require('../utils/auth')

router.post('/create', authenticateToken, (req, res) => {
  const { userId, text } = req.body
  addPost({ userId, text }, (post, err) => {
    if (err) {
      sendErrorResponse(res, 500, err)
    } else {
      sendDataResponse(res, _idStrippedDoc(post))
    }
  })
})

router.get('', authenticateToken, (req, res) => {
  const { id, userId } = req.query
  if (userId) {
    getUserPosts(userId, (posts, err) => {
      if (err) {
        sendErrorResponse(res, 500, err)
      } else {
        sendDataResponse(res, { posts: posts.map(post => _idStrippedDoc(post.toJSON())) })
      }
    })
  } else if (id) {
    getPost(id, (post, err) => {
      if (err) {
        sendErrorResponse(res, 500, err)
      } else {
        sendDataResponse(res, _idStrippedDoc(post))
      }
    })
  } else {
    sendErrorResponse(res, 500, 'Invalid request')
  }
})

router.delete('', authenticateToken, (req, res) => {
  const { id } = req.query
  deletePost(id, (post, err) => {
    if (err) {
      sendErrorResponse(res, 500, err)
    } else {
      sendMsgResponse(res, `Post ${post.id} deleted`)
    }
  })
})

router.put('', authenticateToken, (req, res) => {
  const { id, text } = req.body
  updatePost({ id, text }, (post, err) => {
    if (err) {
      sendErrorResponse(res, 500, err)
    } else {
      sendDataResponse(res, _idStrippedDoc(post))
    }
  })
})

module.exports = router
