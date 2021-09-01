var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
const User = require("../models/User");
var AdminAuth = require("../middleware/AdminAuth")

router.get('/', HomeController.index);
router.post('/user',UserController.create);
router.get('/user',AdminAuth,UserController.index);
router.get('/user/:id',AdminAuth,UserController.findUser);
router.put('/user',AdminAuth,UserController.edit);
router.delete('/user/:id',AdminAuth,UserController.remove);
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/login",UserController.login)

module.exports = router;