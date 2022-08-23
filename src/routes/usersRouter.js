const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const registerValidations = require('../middlewares/registerValidation');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadFile = require('../middlewares/avatarUploadMiddleware');




router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginFunction);

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', uploadFile.single('avatar'), registerValidations, usersController.registerFunction);

router.get('/detail', authMiddleware, usersController.detail);

router.get('/logout', usersController.logout);

router.get('/edit', authMiddleware, usersController.edit)
//router.post('/edit', usersController.editFunction)


router.post('/:id', usersController.añadirCarrito);

module.exports = router;