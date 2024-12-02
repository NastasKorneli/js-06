import color from 'chalk'; // Modul für farbige Konsolenausgaben
import express from 'express'; // Webserver-Framework für Node.js

import Product from './models/Product.js';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const HOST = '127.0.0.1'; //or 'localhost'
const PORT = 8081;
const BASE_URL = `http://${HOST}:${PORT}`;

const STOCK_WARN_AMOUNT = 5;

// Express Setting - EJS Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

try {
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(color.green('Connected to MongoDB'));
} catch (error) {
  console.error(color.red('Error connecting to MongoDB:', error.message));
  process.exit(1);
}

// API Routes

// CRUD - CREATE READ UPDATE DELETE
// RUDI - READ UPDATE DELETE INSERT
// BREAD - BROWSE READ EDIT ADD DELETE

// (C)RUD CREATE -  über HTTP Methode POST
// BRE(A)D - ADD über HTTP Methode POST
app.post('/api/products', async (req, res) => {
  try {
    // add stockwarn property
    req.body.stockWarn = Number(req.body.quantity) < STOCK_WARN_AMOUNT;
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ msg: 'Product added', status: 200, data: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Product not added', error });
  }
});

// C(R)UD READ -  über HTTP Methode GET
// (B)READ - BROWSE über HTTP Methode GET
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Products not found', error });
  }
});

// C(R)UD READ -  über HTTP Methode GET
// B(R)EAD - READ über HTTP Methode GET
app.get('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Product not found', error });
  }
});

// CR(U)D UPDATE -  über HTTP Methode PUT / oder PATCH wenn nur ein Statuswert verändert wird
// BR(E)AD - EDIT über HTTP Methode PUT
app.put('/api/products', async (req, res) => {
  const id = req.body._id;
  try {
    // update stockwarn property
    req.body.stockWarn = Number(req.body.quantity) < STOCK_WARN_AMOUNT;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res
      .status(200)
      .json({ msg: 'Product added', status: 200, data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Product not found', error });
  }
});

// CRU(D) DELETE -  über HTTP Methode DELETE
// BREA(D) - DELETE über HTTP Methode DELETE
app.delete('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res
      .status(200)
      .json({ msg: 'Product deleted', status: 200, data: deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Product not found', error });
  }
});

app.listen(PORT, HOST, () => {
  console.log(color.magenta(`Server running at ${BASE_URL}`));
  console.log(color.yellow('Press Ctrl+C to quit.'));
});
