const pushNotificationControoler = require("../controller/push-notification.controller");
const express = require("express");
const router = express.Router();
router.post("/send-notification",pushNotificationControoler.sendPushNotification);

module.exports = router;