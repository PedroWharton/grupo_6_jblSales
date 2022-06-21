const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/productDetail', mainController.productDetail);
router.get('/ProductCart', mainController.productCart);
router.get('/newProduct', mainController.newProduct);
router.get('/editProduct', mainController.editProduct);

module.exports = router;