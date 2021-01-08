const { Schema, model } = require('mongoose')

const postSchema = new Schema(
  {
    titleImg: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    content: {
      type: [{ tag: { type: String, required: true }, text: String, src: String }],
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

exports.getAllPosts = cb => {
  Post.find({})
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
  const { id, content, title, subtitle, titleImg } = post
  Post.findByIdAndUpdate(id, { content, title, subtitle, titleImg }, { new: true })
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
