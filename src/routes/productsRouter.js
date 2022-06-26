const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.join(__dirname, '../../public/images')); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
  });

const uploadFile = multer({ storage });

router.get('/newProduct', productsController.newProduct);
router.post('/newProduct', uploadFile.single('img'), productsController.newProductFunction);

router.get('/productDetail/:id', productsController.productDetail);
router.post('/:id', productsController.añadirCarrito);

router.get('/editProduct/:id', productsController.editProduct);
router.put('/:id', productsController.editProductFunction);
router.delete('/:id', productsController.deleteProduct);

router.get('/ProductCart', productsController.productCart);

router.get('/', productsController.productsIndex);
router.get('/?:category', productsController.productsIndex);


module.exports = router