
const Role = require('../models/Role');

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      // Populate the user's roles and permissions
      await user.populate('roles').execPopulate();

      const permissions = user.roles.flatMap(role => role.permissions);

      // Check if the user has the required permission
      const hasPermission = permissions.some(permission => permission.name === requiredPermission);
      if (!hasPermission) {
        return res.status(403).json({ message: 'Forbidden: You do not have the required permission' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = checkPermission; 