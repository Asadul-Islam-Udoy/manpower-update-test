const express = require('express');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const {
    createNotification,
    seenUserNotification,
    createGroupNotification,
    getAdminUniqueUserNotification,
    updateNotifications,
    deleteNotifications,
    getUserAllNotificationNotification,
    getAllNotification
  } = require("../controllers/notificationController");
const permissionMiddleware = require('../middleware/permissionMiddleware');

const router = express.Router();

// Create a new notification
router.post('/create/:id', isAdminUserMiddleware,permissionMiddleware('client-single-notification-send'),createNotification);

// create group notification
router.post('/create/groups/notification',isAdminUserMiddleware,permissionMiddleware('client-group-notification-send'),createGroupNotification);


//get admin unique user notifications
router.get('/get/admin/unique/user/notifications/:id',isAdminUserMiddleware,getAdminUniqueUserNotification);

///update user notification
router.put('/update/notification/:userid/:notificationid',isAdminUserMiddleware,permissionMiddleware('client-notification-update'),updateNotifications);

//delete notification by admin
router.delete('/delete/notification/admin/:userid/:notificationid',isAdminUserMiddleware,permissionMiddleware('client-notification-delete'),deleteNotifications);
//delete notification by user
router.delete('/delete/notification/user/:userid/:notificationid',isAdminUserMiddleware,deleteNotifications);
//get user all notification
router.get('/get/user/all/notifications',isAdminUserMiddleware,getUserAllNotificationNotification);

//get user all notification
router.get('/seen/user/notifications/:notificationid',isAdminUserMiddleware,seenUserNotification);

//get all notification
router.get('/get/all',isAdminUserMiddleware,permissionMiddleware('client-notification-lists'),getAllNotification);
module.exports = router;
