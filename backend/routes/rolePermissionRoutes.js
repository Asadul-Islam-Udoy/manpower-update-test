const express = require('express');
const { createPermissionController, createRoleController, getAllRoleListsController, getAllPermissionListsController } = require('../controllers/rolePermissionController');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware')
const router = express.Router();
// Create a new role
router.post('/create/role',isAdminUserMiddleware,isAdminMiddleware('admin'),createRoleController);

// Get all roles lists
router.get('/all/roles',isAdminUserMiddleware,isAdminMiddleware('admin'), getAllRoleListsController);

// Create a new permission
router.post('/create/permissions',isAdminUserMiddleware,isAdminMiddleware('admin'),createPermissionController);

// get all permissions lists
router.get('/get/all/permissions',isAdminUserMiddleware,isAdminMiddleware('admin'),getAllPermissionListsController);

module.exports = router;
