const { body } = require('express-validator');


const validations = [
    body('username').notEmpty().withMessage('Tenes que escribir un nombre de usuario').bail()
    .isLength({min: 4, max: 30}).withMessage('El nombre de usuario debe tener entre 4 y 30 caracteres'),

    body('email').notEmpty().withMessage('Tenes que escribir un email').bail()
    .isEmail().withMessage('Debes escribir un email valido'),
    

    body('password').notEmpty().withMessage('Tenes que escribir una contraseña').bail()
    .isLength({ min: 8, max: 20 }).withMessage('La contraseña debe tener entre 8 y 20 caracteres').bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage('La contraseña debe contener una mayuscula y un numero'),

    body('pswRepeat').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Las contraseñas deben coincidir');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
      })
];

module.exports = validations;