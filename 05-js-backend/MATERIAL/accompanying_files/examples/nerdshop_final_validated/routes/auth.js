import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

import validator from 'validator';

// Authentifizierung mit JWT
import jwt from 'jsonwebtoken';

const router = Router();

// REGISTER - CREATE USER
router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  //   const emailExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  // emailExp.test(email)

  // Validation stuff right here
  if (!email || !validator.isEmail(email)) {
    return res.status(422).json({ msg: 'The email is incorrect!' });
  }

  if (password !== confirmPassword) {
    return res.status(422).json({ msg: 'Password does not match!' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ msg: 'User already exists!' });
    }

    // Password hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save(); // => objekt in DB speichern
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// LOGIN
router.post('/login', async (req, res, next) => {
  const { username, password: pwd } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json('Wrong credentials'); //next(errorResponse('User does not exist', 400));
  }
  const validated = await bcrypt.compare(pwd, user.password);

  if (!validated) {
    return res.status(400).json('Wrong credentials');
  }
  try {
    //  Generierung vom Accesstoken beim Login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5d',
    });

    const { password, ...others } = user._doc;
    return res.status(200).json({ others, token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
