const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require('../config/config')
let {
  User
} = require("../model/userModel")


let createUser = (req, res) => {
  let data = req.body
  let user = new User()
  // user = data
  user.name = data.name
  user.email = data.email
  user.nickname=data.nickname
  user.password = data.password
  user.save().then((user, err) => {
    res.json(user)
  }).catch((error) => {
    res.json(error);
  });

}

let login = (req, res) => {
  let data = req.body
  //User.findOne({
  //  nickname: data.nickname
  User.findOne().or([{'email': data.email}, {'nickname': data.nickname}])
  .then((user) => {
    if (!user) {
      res.json("User doesnt exist or incorect user name. Maby you have to register before login.")
      return
    }
    bcrypt.compare(data.password, user.password, (err, resp) => {
      if (resp) {
        let access = 'auth'
        let token = jwt.sign({
          _id: user._id.toHexString(),
          access
        }, config.superSecret).toString()
        user.tokens.push({
          access,
          token
        })
        user.save().then(() => {
          res.header('x-auth', token).json(user)
        })
      } else {
        res.json("Incorrect password")
      }
    })

  }).catch((error) => {
    res.json("Something went wrong, please try again")
  })
}

let logout = (req, res) => {
  let token = req.token
  req.user.update({
    $pull: {
      tokens: {
        token
      }
    }
  }).then(() => {
    res.json("logged out")
  })
}




module.exports = {
  createUser,
  login,
  logout
}