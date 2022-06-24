const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


router.get('/newProduct', productsController.newProduct);
router.post('/newProduct', productsController.newProductFunction);

router.get('/productDetail/:id', productsController.productDetail);
router.post('/:id', productsController.añadirCarrito);

router.get('/editProduct/:id', productsController.editProduct);
router.put('/:id', productsController.editProductFunction);

router.get('/ProductCart', productsController.productCart);

router.get('/?:category', productsController.productsIndex);



module.exports = router;