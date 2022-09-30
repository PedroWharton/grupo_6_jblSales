const express = require('express');
const { getCategories } = require('../controllers/categoryAPIController');
const router = express.Router();
const categoryAPIController = require('../controllers/categoryAPIController');

router.post('/create/:category', categoryAPIController.createCategory)
router.put('/update/:category', categoryAPIController.updateCategory)
router.delete('/create/:category', categoryAPIController.destroyCategory)
router.get('/', getCategories)


module.exports = router;