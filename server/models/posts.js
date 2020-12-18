const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  }
}).set('toJSON', { virtuals: true })

const Post = model('Post', postSchema)

exports.addPost = (post, cb) => {
  const { userId, text } = post
  const newPost = new Post({ author: userId, text })
  newPost
    .save()
    .then(post => {
      cb(post.toJSON())
    })
    .catch(err => {
      cb(undefined, err.message)
    })
}

exports.getUserPosts = (userId, cb) => {
  Post.find({ author: userId })
    .then(posts => {
      cb(posts)
    })
    .catch(err => {
      cb(undefined, err.message)
    })
}

exports.getPost = (id, cb) => {
  Post.findById(id)
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
  const { id, text } = post
  Post.findByIdAndUpdate(id, { text }, { new: true })
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
