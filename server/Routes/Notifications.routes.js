const NotificationController  = require('../Controllers/Notifications.controller')

const express = require('express');
const verifyToken = require('../Middlewares/auth');
const router = express.Router();
router.get("/notifications/getnotifs",verifyToken,NotificationController.getNotif);
module.exports = router;