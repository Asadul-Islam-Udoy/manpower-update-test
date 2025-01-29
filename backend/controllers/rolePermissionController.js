const Permission = require("../models/permission");
const Role = require('../models/roles');

/// create permission
exports.createPermissionController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const permission = new Permission({ name, description });
    await permission.save();
    res.status(201).json({ message: "Permission created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/// get all permission
exports.getAllPermissionListsController = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json({
        flag:true,
        message:'all permissions getting successfully!',
        permissions
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/// create role
exports.createRoleController = async (req, res) => {
  try {
    const { roleName, permissions } = req.body;
    const role = new Role({ name:roleName, permissions });
    await role.save();
    res.status(201).json({ message: "Role created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/// get all roles
exports.getAllRoleListsController = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).json({
        flag:true,
        message:'all role getting successfully!',
        roles
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
