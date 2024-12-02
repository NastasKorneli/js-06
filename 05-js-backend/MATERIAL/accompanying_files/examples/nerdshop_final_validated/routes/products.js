import { Router } from 'express';
import Product from '../models/Product.js';
import { isAdmin, isAuthenticated } from '../middlewares/auth.js';
const router = Router();

const STOCK_WARN_AMOUNT = 5;

// CRUD - CREATE READ UPDATE DELETE
// RUDI - READ UPDATE DELETE INSERT
// BREAD - BROWSE READ EDIT ADD DELETE

// (C)RUD CREATE -  über HTTP Methode POST
// BRE(A)D - ADD über HTTP Methode POST
router.post('/', [isAuthenticated, isAdmin], async (req, res) => {
  try {
    // add stockwarn property
    req.body.stockWarn = Number(req.body.quantity) < STOCK_WARN_AMOUNT;

    // Validierung
    const { code, quantity, price } = req.body;
    if (!/^[a-zA-Z0-9]+$/.test(code)) {
      return res.status(400).json({
        msg: 'Code ist ungültig. Erlaubt sind nur alphanumerische Zeichen.',
      });
    }
    if (quantity <= 0) {
      return res
        .status(400)
        .json({ msg: 'Menge muss eine positive Zahl sein.' });
    }
    if (price <= 0) {
      return res
        .status(400)
        .json({ msg: 'Preis muss eine positive Zahl sein.' });
    }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    console.log(savedProduct);
    res
      .status(201)
      .json({ msg: 'Produkt hinzugefügt', status: 201, data: savedProduct });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Produkt konnte nicht hinzugefügt werden.' });
  }
});

// C(R)UD READ -  über HTTP Methode GET
// (B)READ - BROWSE über HTTP Methode GET
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Product not found.', error });
  }
});

// CR(U)D UPDATE -  über HTTP Methode PUT
// BRE(A)D - EDIT über HTTP Methode PUT
router.put('/:id', [isAuthenticated, isAdmin], async (req, res) => {
  const id = req.params.id;
  try {
    // add stockwarn property
    req.body.stockWarn = Number(req.body.quantity) < STOCK_WARN_AMOUNT;

    // Validierung
    const { code, quantity, price } = req.body;
    if (!/^[a-zA-Z0-9]+$/.test(code)) {
      return res
        .status(400)
        .json({
          msg: 'Code ist ungültig. Erlaubt sind nur alphanumerische Zeichen.',
        });
    }
    if (quantity <= 0) {
      return res
        .status(400)
        .json({ msg: 'Menge muss eine positive Zahl sein.' });
    }
    if (price <= 0) {
      return res
        .status(400)
        .json({ msg: 'Preis muss eine positive Zahl sein.' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Produkt nicht gefunden.' });
    }
    res
      .status(200)
      .json({
        msg: 'Produkt aktualisiert.',
        status: 200,
        data: updatedProduct,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Produkt konnte nicht aktualisiert werden.', error });
  }
});

// CRU(D) DELETE -  über HTTP Methode DELETE
// BREA(D) - DELETE über HTTP Methode DELETE
router.delete('/:id', [isAuthenticated, isAdmin], async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Product not found.' });
    }
    res
      .status(200)
      .json({ msg: 'Product deleted', status: 200, data: deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Product could not be deleted.', error });
  }
});

export default router;
