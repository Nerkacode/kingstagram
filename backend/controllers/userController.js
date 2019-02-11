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
  //  nickname: data.nickname+
  // console.log(data)
  User.findOne().or([{'email': data.email}, {'nickname': data.nickname}])
  .then((user) => {
    // console.log(user)
    if (!user) {
      res.status(401).json("User doesnt exist or incorect user name. Maby you have to register before login.")
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
// for test
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

let getAllUsers = (req, res) => {
  User.find({}, (users, err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  })
}

let getCurrentUsers = (req, res) => {
  res.json(req.user)
   }
  
   let changeUserPhoto = (req, res) => {
     let user = req.user
     user.userphoto = "http://localhost:3000/" + req.file.path
     user.save()
     .then((user) => {
      res.json(user)
     })
   }

module.exports = {
  createUser,
  login,
  logout,
  getAllUsers,
  getCurrentUsers,
  changeUserPhoto
}