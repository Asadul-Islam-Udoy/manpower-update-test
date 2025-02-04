const express = require('express');
const isAdminMiddleware = require("../middleware/AdminMiddleware");
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const { 
    SendMessageController,
    GetAllMessageController,
    GetSingleMessageController,
    DeleteMessageController
} = require('../controllers/contractController');
const permissionMiddleware = require('../middleware/permissionMiddleware');


const router = express.Router();

router.post('/client/send/:userid',isAdminUserMiddleware ,SendMessageController);

router.get('/get/all',isAdminUserMiddleware,permissionMiddleware('contract-lists'),GetAllMessageController);

router.get('/get/single/:userId',isAdminUserMiddleware,permissionMiddleware('contract-message-lists'),GetSingleMessageController);

router.delete('/delete/:userId/:messageId',isAdminUserMiddleware,permissionMiddleware('contract-message-delete'),DeleteMessageController);

module.exports = router;