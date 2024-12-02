import mongoose from 'mongoose';
import color from 'chalk';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.SERVER_PORT || 8081;
const HOST = process.env.SERVER_HOST || '127.0.0.1'; // 'localhost'
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || `http://${HOST}:${PORT}`;

const connectMongoDb = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(color.green('Connected to MongoDB'));
  } catch (error) {
    console.error(color.red('Error connecting to MongoDB:', error.message));
    process.exit(1);
  }
};

export { PORT, HOST, SERVER_BASE_URL, connectMongoDb };
