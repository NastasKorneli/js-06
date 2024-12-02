import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
import color from 'chalk';
import bcrypt from 'bcryptjs';

import User from './models/User.js'; // Adjust the path as necessary

dotenv.config();

console.log(process.env.MONGODB_URI);

const usersSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Delete existing entries
    await User.deleteMany({});

    const salt = await bcrypt.genSalt(10);

    const users = [
      {
        username: 'user1',
        email: 'user1@example.com',
        password: await bcrypt.hash('password1', salt),
        isAdmin: false,
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: await bcrypt.hash('password2', salt),
        isAdmin: false,
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpassword', salt),
        isAdmin: true,
      },
    ];

    await User.insertMany(users);
    console.log(
      color.yellow('Users:'),
      color.green(`Seed data inserted successfully`)
    );
  } catch (error) {
    console.error(color.red('Error inserting user seed data:', error));
  } finally {
    mongoose.connection.close();
  }
};

usersSeed();

export default usersSeed;
