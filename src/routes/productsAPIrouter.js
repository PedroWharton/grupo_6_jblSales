const express = require('express');
const router = express.Router();
const productsAPIcontroller = require('../controllers/productsAPIcontroller');

router.get('/', productsAPIcontroller.getProducts)
router.get('/:id', productsAPIcontroller.productDetail)

module.exports = router;