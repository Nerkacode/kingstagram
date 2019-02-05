const jwt = require('jsonwebtoken')
const {
  superSecret
} = require('../config/config')
const {
  User
} = require('../model/userModel')

let authenticate = (req, res, next) => { //siuo atveju next apibrezia kad cia yra middleware funkcija
  let token = req.header("x-auth") //pagooglinti header
  let decoded;
  try {
    decoded = jwt.verify(token, superSecret)
    User.findOne({
      _id: decoded._id,
      "tokens.access": "auth",
      "tokens.token": token
    }).then((user) => {
      if (user) {
        req.user = user
        req.token = token
        next()
      } else {
        res.status(401).json("You are not authorized")
      }
    })
  } catch (e) {
    res.json(e)
  }
}

module.exports = {
  authenticate
}