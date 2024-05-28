const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User.controller');
const verifyToken = require('../Middlewares/auth');

router.get("/user/getuser", verifyToken, UserController.getUser);
router.post("/user/createuser", UserController.createUser);
router.post("/user/loginuser", UserController.loginUser);
router.post("/user/logoutuser", UserController.logoutUser);

module.exports = router;
