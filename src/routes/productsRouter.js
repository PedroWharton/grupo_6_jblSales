const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const uploadFile = require('../middlewares/loadImgMulter');
const productValidations = require('../middlewares/productValidations');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/newProduct', productsController.newProduct);
router.post('/newProduct', uploadFile.single('img'), productValidations, productsController.newProductFunction);

router.get('/productDetail/:id', productsController.productDetail);

router.get('/editProduct/:id', productsController.editProduct);
router.put('/:id', productsController.editProductFunction);
router.delete('/:id', productsController.deleteProduct);

router.get('/ProductCart', authMiddleware, productsController.productCart);

router.get('/', productsController.productsIndex);
router.get('/:category', productsController.productsIndex);




module.exports = router