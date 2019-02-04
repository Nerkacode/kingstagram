const router = require("express").Router()
//const todoController = require('../controllers/kingsController')
const userController = require("../controllers/userController.js")
const middleware = require('../middleware/middleware.js')

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: "API is working correctly"
  })
})

router.route('/kingstagram')
  .post(middleware.authenticate, todoController.createTodoItem)
  .get(middleware.authenticate, todoController.getItems)

router.route('/kingstagramID')
.post(todoController.getByID)

router.route("/user")
  .post(userController.createUser)

router.route("/login")
  .post(userController.login)

router.route("/logout")
  .get(middleware.authenticate, userController.logout)

module.exports = router