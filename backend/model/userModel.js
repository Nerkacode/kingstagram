const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not valid email"
    }
  },
  nickname: {
    type: String,
    required: true,
    unique:true,
    minlength: 5
  },
  password: {
    type: String,
    required: true
  },
  userphoto: {
    type: String,
    default: "http://127.0.0.1:5500/frondend/Photos/king_icon.gif"
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.pre("save", function(next) {
  let user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

let User = mongoose.model("Users", UserSchema)
module.exports = {
  User
}