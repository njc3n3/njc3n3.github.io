const router = require('express').Router()
const { addPost, getPosts, getPost, deletePost, updatePost } = require('../models/posts')
const { sendErrorResponse, sendDataResponse, sendMsgResponse, _idStrippedDoc } = require('../utils/response')
const { authenticateToken } = require('../utils/auth')

router.post('/create', authenticateToken, (req, res) => {
  const { title, content, isPublished, tags } = req.body
  addPost({ title, content, isPublished, tags }, (post, err) => {
    if (err) {
      sendErrorResponse(res, 500, err)
    } else {
      sendDataResponse(res, _idStrippedDoc(post))
    }
  })
})

function handlePostAndDraftRequests(req, res, showDrafts) {
  const { id, tag, text } = req.query
  if (id) {
    getPost({ id, showDrafts }, (post, err) => {
      if (err) {
        sendErrorResponse(res, 500, err)
      } else {
        sendDataResponse(res, _idStrippedDoc(post))
      }
    })
  } else {
    getPosts({ tag, text, showDrafts }, (posts, err) => {
      if (err) {
        sendErrorResponse(res, 500, err)
      } else {
        sendDataResponse(res, { posts: posts.map(post => _idStrippedDoc(post.toJSON())) })
      }
    })
  }
}

// Open route for public readers
router.get('', (req, res) => handlePostAndDraftRequests(req, res, false))

router.get('/drafts', authenticateToken, (req, res) => handlePostAndDraftRequests(req, res, true))

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
  const { id, title, content, isPublished, tags } = req.body
  updatePost({ id, title, content, isPublished, tags }, (post, err) => {
    if (err) {
      sendErrorResponse(res, 500, err)
    } else {
      sendDataResponse(res, _idStrippedDoc(post))
    }
  })
})

module.exports = router
