const { body } = require('express-validator');


const productValidations = [
    body('name').notEmpty().withMessage('Tenes que escribir un nombre de producto').bail()
    .isLength({min: 5, max: 50}).withMessage('El nombre de producto debe tener entre 5 y 50 caracteres'),

    body('description').notEmpty().withMessage('Tenes que escribir una descripcion').bail()
    .isLength({min: 20, max: 1000}).withMessage('La descripcion debe tener un minimo de 20 carateres y maximo de 1000'),
    

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

module.exports = productValidations;