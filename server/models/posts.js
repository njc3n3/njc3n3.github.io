const { Schema, model } = require('mongoose')

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    isPublished: {
      type: Boolean,
      required: true
    },
    tags: {
      type: [String],
      required: true
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
).set('toJSON', { virtuals: true })

const Post = model('Post', postSchema)

exports.addPost = (post, cb) => {
  const newPost = new Post(post)
  newPost
    .save()
    .then(post => {
      cb(post.toJSON())
    })
    .catch(err => {
      cb(undefined, err.message)
    })
}

exports.getPosts = ({ tag, text, showDrafts }, cb) => {
  let filter = !tag && !text ? null : {}
  filter = tag ? { tags: tag } : filter // search by tag
  if (text) {
    const re = new RegExp(text, 'i')
    filter = { ...filter, $or: [{ title: re }, { content: re }] } // search by tag AND (title OR content contains)
  }
  const limit = filter === null && !showDrafts ? 5 : null // limit post results if query has no filters (NOTE: no limit on drafts)

  Post.find({ isPublished: showDrafts ? false : true, ...filter })
    .sort({ created: 'desc' })
    .limit(limit)
    .then(posts => {
      cb(posts)
    })
    .catch(err => {
      cb(undefined, err.message)
    })
}

exports.getPost = ({ id, showDrafts }, cb) => {
  Post.findById(id)
    .then(post => {
      if (post) {
        if (!showDrafts && !post.isPublished) {
          cb(undefined, 'This post is in not published yet')
        } else if (showDrafts && post.isPublished) {
          cb(undefined, 'This post has already been published')
        } else {
          cb(post.toJSON())
        }
      } else {
        cb(undefined, `Post ${id} not found`)
      }
    })
    .catch(err => {
      cb(undefined, err.message)
    })
}

exports.deletePost = (id, cb) => {
  Post.findByIdAndDelete(id)
    .then(post => {
      if (post) {
        cb(post.toJSON())
      } else {
        cb(undefined, `Post ${id} not found`)
      }
    })
    .catch(err => {
      cb(undefined, err.message)
    })
}

exports.updatePost = (post, cb) => {
  const { id, ...restPost } = post
  Post.findByIdAndUpdate(id, { ...restPost }, { new: true })
    .then(post => {
      if (post) {
        cb(post.toJSON())
      } else {
        cb(undefined, `Post ${id} not found`)
      }
    })
    .catch(err => {
      cb(undefined, err.message)
    })
}
