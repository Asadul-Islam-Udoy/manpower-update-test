const Role = require('../models/roles');
const permissionMiddleware = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const adminRoles = req.admin.roles;
      const roles = await Role.find({ _id: { $in: adminRoles } }).populate('permissions');
      const hasPermission = roles.some((role) =>
        role.permissions.some((perm) => perm.name === requiredPermission)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = permissionMiddleware;
