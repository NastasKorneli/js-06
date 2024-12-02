import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.token ? req.headers.token.split(' ')[1] : null;

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

// admin middleware
// exports.isAdmin = (req, res, next) => {
//   if (req.user.role === 0) {
//     return next(new ErrorResponse('Access denied, you must be an admin', 401));
//   }
//   next();
// };
// // check if user is authenticated
// exports.isAuthenticated = async (req, res, next) => {
//   const { token } = req.cookies;

//   // make sure token exists
//   if (!token) {
//     return next(new ErrorResponse('You must log in to access this ressource', 401));
//   }

//   try {
//     //verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch (error) {
//     return next(new ErrorResponse('You must log in to access this ressource', 401));
//   }
// };

export default { isAuthenticated, isAdmin };
