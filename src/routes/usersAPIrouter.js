const express = require('express');
const router = express.Router();
const usersAPIcontroller = require('../controllers/usersAPIcontroller');

router.get('/', usersAPIcontroller.getUsers)
router.get('/:id', usersAPIcontroller.userDetail)

module.exports = router;