const router = require("express").Router()
//const kingsController = require('../controllers/kingsController')
const userController = require("../controllers/userController.js")
const middleware = require('../middleware/middleware.js')

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: "API is working correctly"
  })
})

//router.route('/kingstagram')
//  .post(middleware.authenticate, kingsController.createTodoItem) // cia reiks pakoreguoti createTodoItem funkcija ir name
//  .get(middleware.authenticate, kingsController.getItems)

//router.route('/kingstagramID')
//.post(kingsController.getByID)

router.route("/user")
  .post(userController.createUser)
  .get(userController.getAllUsers)

router.route("/login")
  .post(userController.login)

router.route("/logout")
  .get(middleware.authenticate, userController.logout)

module.exports = router