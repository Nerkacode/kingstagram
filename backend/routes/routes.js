const router = require("express").Router()
//const kingsController = require('../controllers/kingsController')
const userController = require("../controllers/userController.js")
const middleware = require('../middleware/middleware.js')
const multer = require('multer')

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: "API is working correctly"
  })
})

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({
  storage: storage
})

//router.route('/kingstagram')
//  .post(middleware.authenticate, kingsController.createTodoItem) // cia reiks pakoreguoti createTodoItem funkcija ir name
//  .get(middleware.authenticate, kingsController.getItems)

//router.route('/kingstagramID')
//.post(kingsController.getByID)

router.route("/user")
  .post(userController.createUser)
  .get(middleware.authenticate, userController.getAllUsers)

  router.route("/currentUsers")
  .get(middleware.authenticate, userController.getCurrentUsers)

router.route("/login")
  .post(userController.login)

router.route("/logout")
  .get(middleware.authenticate, userController.logout)

  router.route('/image')
  .post(middleware.authenticate, upload.single('avatar'), userController.changeUserPhoto)

module.exports = router