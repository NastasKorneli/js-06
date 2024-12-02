import mongoose from 'mongoose';
import color from 'chalk';
import * as dotenv from 'dotenv';
import productsSeed from './productsSeed.js'; // Adjust the path as necessary

import usersSeed from './usersSeed.js';

dotenv.config();

const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    await usersSeed();
    await productsSeed();

    console.log(color.green('All seed data inserted successfully'));
    mongoose.connection.close();
  } catch (error) {
    console.error(color.red('Error inserting seed data:', error));
    mongoose.connection.close();
  }
};

seedAll();
