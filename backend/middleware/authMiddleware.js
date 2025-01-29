const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    req.admin = admin; // Attach admin to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

module.exports = authMiddleware;
