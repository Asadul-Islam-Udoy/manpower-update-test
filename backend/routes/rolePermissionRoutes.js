const express = require('express');
const { createPermissionController, createRoleController, getAllRoleListsController, getAllPermissionListsController, getRoleByAdminIdController, giveAdminPermissionController, updateRoleController, deleteRoleController } = require('../controllers/rolePermissionController');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');
const router = express.Router();
// Create a new role
router.post('/create/role',isAdminUserMiddleware,createRoleController);//permissionMiddleware('admin-role-create')

// Get all roles lists
router.get('/all/roles',isAdminUserMiddleware,permissionMiddleware('admin-role-lists'), getAllRoleListsController);

/// given permistion
router.put('/given/admin/role/permission/:userId',isAdminUserMiddleware,permissionMiddleware('admin-give-permission'), giveAdminPermissionController);

/// get roles by admin id
router.get('/get/roles/:userId',isAdminUserMiddleware,isAdminMiddleware('admin-role-info'), getRoleByAdminIdController);

// Create a new permission
router.post('/create/permissions',isAdminUserMiddleware,permissionMiddleware('admin-role-create'),createPermissionController);

// get all permissions lists
router.get('/get/all/permissions',isAdminUserMiddleware,getAllPermissionListsController);//permissionMiddleware('admin-permission-lists')

/// update role
router.put('/update/role/:id',isAdminUserMiddleware,permissionMiddleware('admin-role-update'),updateRoleController);

/// delete role
router.delete('/delete/role/:id',isAdminUserMiddleware,permissionMiddleware('admin-role-delete'),deleteRoleController);
module.exports = router;
