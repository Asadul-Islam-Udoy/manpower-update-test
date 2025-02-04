const Admin = require("../models/admin");
const Permission = require("../models/permission");
const Role = require("../models/roles");

/// create permission
exports.createPermissionController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const permission = new Permission({ name, description });
    await permission.save();
    res.status(201).json({ message: "Permission created successfully!" });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error.message,
    });
  }
};

/// get all permission
exports.getAllPermissionListsController = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json({
      flag: true,
      message: "all permissions getting successfully!",
      permissions,
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error.message,
    });
  }
};

/// create role
exports.createRoleController = async (req, res) => {
  try {
    const { roleName, permissions } = req.body;
    const role = new Role({ name: roleName, permissions });
    await role.save();
    res.status(201).json({ message: "Role created successfully!" });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error.message,
    });
  }
};


/// get all roles
exports.getAllRoleListsController = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).json({
      flag: true,
      message: "all role getting successfully!",
      roles,
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error.message,
    });
  }
};

/// give the admin permission
exports.giveAdminPermissionController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { roles } = req.body;
    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "admin is not found!",
      });
    }
    admin.roles = Array.from(new Set(roles)) || [];
    admin.save({ validateBeforeSave: false });
    res.status(200).json({
      flag: true,
      message: "roles given successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error.message,
    });
  }
};

/// ADMIN ID TO ROLE GET
exports.getRoleByAdminIdController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const admin = await Admin.findById(userId)
      .populate({
        path: "roles",
        populate: { path: "permissions", model: "Permission" },
      })
      .exec();
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "admin is not found!",
      });
    }
    res.status(200).json({
      flag: true,
      message: "roles given successfully!",
      admin,
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error.message,
    });
  }
};

//// delete role
exports.deleteRoleController = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findByIdAndDelete(roleId);
    if (!role) {
      return res.status(400).json({
        flag: false,
        message: "role delete fails",
      });
    }
    res.status(200).json({
      flag: true,
      message: "role delete successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error.message,
    });
  }
};


//// update role
exports.updateRoleController = async (req, res) => {
  try {
    const roleId = req.params.id;
    const {roleName,permissions} = req.body;
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(400).json({
        flag: false,
        message: "role update fails",
      });
    }
    role.name = roleName;
    role.permissions = Array.from(new Set(permissions)) || [];
    role.save({validateBeforeSave:false});
    res.status(200).json({
      flag: true,
      message: "role update successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error.message,
    });
  }
};
