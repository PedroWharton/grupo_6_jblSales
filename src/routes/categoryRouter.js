const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/create/:category', productsController.createCategory)
router.put('/update/:category', productsController.updateCategory)
router.delete('/create/:category', productsController.destroyCategory)