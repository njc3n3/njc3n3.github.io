const router = require('express').Router()
const { addPost, getAllPosts, getPost, deletePost, updatePost } = require('../models/posts')
const { sendErrorResponse, sendDataResponse, sendMsgResponse, _idStrippedDoc } = require('../utils/response')
const { authenticateToken } = require('../utils/auth')

router.post('/create', authenticateToken, (req, res) => {
  const { titleImg, title, subtitle, content } = req.body
  addPost({ titleImg, title, subtitle, content }, (post, err) => {
    if (err) {
      sendErrorResponse(res, 500, err)
    } else {
      sendDataResponse(res, _idStrippedDoc(post))
    }
  })
})

// Open route for public readers
router.get('', (req, res) => {
  const { id } = req.query
  if (id) {
    getPost(id, (post, err) => {
      if (err) {
        sendErrorResponse(res, 500, err)
      } else {
        sendDataResponse(res, _idStrippedDoc(post))
      }
    })
  } else {
    getAllPosts((posts, err) => {
      if (err) {
        sendErrorResponse(res, 500, err)
      } else {
        sendDataResponse(res, { posts: posts.map(post => _idStrippedDoc(post.toJSON())) })
      }
    })
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
  const { id, titleImg, title, subtitle, content } = req.body
  updatePost({ id, titleImg, title, content, subtitle }, (post, err) => {
    if (err) {
      sendErrorResponse(res, 500, err)
    } else {
      sendDataResponse(res, _idStrippedDoc(post))
    }
  })
})

module.exports = router
