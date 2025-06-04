const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/all/:userNum', notificationController.getAllNotificationsAndMarkAsRead);
router.get('/unread/:userNum', notificationController.checkUnreadNotification);

module.exports = router;