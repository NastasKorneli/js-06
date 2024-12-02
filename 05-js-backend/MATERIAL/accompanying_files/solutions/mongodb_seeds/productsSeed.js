import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import color from 'chalk';

import Product from './models/Product.js';

dotenv.config();

const productsSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Delete existing entries
    await Product.deleteMany({});

    const products = [
      {
        code: 'MUG0007',
        shortDescription: 'coffee mug with LCD level indicator',
        tagline: 'never again reach for the empty mug',
        quantity: 20,
        price: 49.9,
        stockWarn: false,
      },
      {
        code: 'MUG0013',
        shortDescription:
          'coffee mug with bluetooth-connected coffee grounds scanner for automatized fortune telling',
        tagline: 'put the smart into coffee reading',
        quantity: 20,
        price: 99.9,
        stockWarn: false,
      },
      {
        code: 'OFF3145',
        shortDescription: 'pen with pre-warmed ink (tested on the South Pole)',
        tagline: 'the pen is mightier than the cold',
        quantity: 50,
        price: 29.9,
        stockWarn: false,
      },
      {
        code: 'COM1001',
        shortDescription: 'ambidextrous computer mouse',
        tagline: 'end the dictate of left and right',
        quantity: 10,
        price: 19.9,
        stockWarn: false,
      },
      {
        code: 'COM0404',
        shortDescription: 'Easter egg themed webcam for your monitor',
        tagline: 'put an Easter egg on hardware too',
        quantity: 20,
        price: 149.9,
        stockWarn: false,
      },
      {
        code: 'COM0001',
        shortDescription: 'Vulcan language vi cheatsheet',
        tagline: 'learn vi and Vulcan at the same time',
        quantity: 3,
        price: 9.9,
        stockWarn: true,
      },
      {
        code: 'COM1536',
        shortDescription: 'Klingon language emacs cheatsheet',
        tagline: 'learn emacs and Klingon at the same time',
        quantity: 50,
        price: 9.9,
        stockWarn: false,
      },
      {
        code: 'MOB0555',
        shortDescription: 'smartphone case with built-in screen',
        tagline: 'never miss a message',
        quantity: 20,
        price: 39.9,
        stockWarn: false,
      },
    ];

    await Product.insertMany(products);
    console.log(
      color.yellow('Products:'),
      color.green(`Seed data inserted successfully`)
    );
  } catch (error) {
    console.error(color.red('Error inserting seed data:', error));
  } finally {
    mongoose.connection.close();
  }
};

productsSeed();

export default productsSeed;
