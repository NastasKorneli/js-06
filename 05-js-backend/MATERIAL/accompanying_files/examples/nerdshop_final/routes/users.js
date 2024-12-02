import { Router } from 'express';
import User from '../models/User.js';
import Project from '../models/Project.js';
import bcrypt from 'bcryptjs';

import { isAuthenticated, isAdmin } from '../middlewares/auth.js';

const router = Router();

// UPDATE
router.put('/:id', isAuthenticated, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_STRENGTH));
    req.body.password = await bcrypt.hash(req.body.password, salt);
    // req.body.password = await bcrypt.hash(req.body.password, Number(process.env.BCRYPT_STRENGTH));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// DELETE
router.delete('/:id', isAdmin, async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        // Wenn alle zugehörigen Projekte mit gelöscht werden sollen.
        await Project.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json('User has been deleted');
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(401).json('You can delete only your account');
  }
});

// GET
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const { ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
