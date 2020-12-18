const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcrypt')

const saltRounds = 10

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}).set('toJSON', { virtuals: true })

const User = model('User', userSchema)

exports.addUser = (user, cb) => {
  const { username, password } = user
  hash(password, saltRounds, (err, hash) => {
    if (err) {
      cb(undefined, err.message)
    } else {
      const newUser = new User({ username, password: hash })
      newUser
        .save()
        .then(user => {
          cb(user.toJSON())
        })
        .catch(err => {
          cb(undefined, err.message)
        })
    }
  })
}

exports.getUserByUsername = (username, cb) => {
  User.findOne({ username })
    .then(doc => {
      if (doc) {
        cb(doc.toJSON())
      } else {
        cb(undefined, `${username} not found`)
      }
    })
    .catch(err => {
      cb(undefined, err)
    })
}

exports.comparePassword = (candidatePassword, hash, cb) => {
  compare(candidatePassword, hash, (err, isMatch) => {
    if (err) {
      cb(err)
    } else {
      cb(undefined, isMatch)
    }
  })
}
