import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // => ['Bearer', <token>]

  // Überprüfung ob Token existiert
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No authentication token, access denied' });
  }
  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(401)
        .json({ msg: 'Token verification failed, authorization denied' });
    }
    req.user = { id: user.id, isAdmin: user.isAdmin };
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ ...error, msg: 'Token not valid!', success: false });
  }
};

export const isAdmin = async (req, res, next) => {
  isAuthenticated(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(errorResponse('Operation not allowed. You have to be admin'));

      return res
        .status(403)
        .json({ msg: 'Operation not allowed. You have to be admin' });
    }
  });
};

export default { isAuthenticated, isAdmin };
