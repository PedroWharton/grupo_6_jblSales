const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController');
const uploadFile = require('../middlewares/loadImgMulter');



router.get('/newProduct', productsController.newProduct);
router.post('/newProduct', uploadFile.single('img'), productsController.newProductFunction);

router.get('/productDetail/:id', productsController.productDetail);
router.post('/:id', productsController.añadirCarrito);

router.get('/editProduct/:id', productsController.editProduct);
router.put('/:id', productsController.editProductFunction);
router.delete('/:id', productsController.deleteProduct);

router.get('/ProductCart', productsController.productCart);

router.get('/', productsController.productsIndex);
router.get('/:category', productsController.productsIndex);




module.exports = router