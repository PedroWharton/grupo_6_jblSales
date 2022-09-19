const { body } = require('express-validator');


const productValidations = [
    body('name').notEmpty().withMessage('Tenes que escribir un nombre de producto').bail()
    .isLength({min: 5, max: 50}).withMessage('El nombre de producto debe tener entre 5 y 50 caracteres'),

    body('description').notEmpty().withMessage('Tenes que escribir una descripcion').bail()
    .isLength({min: 20, max: 1000}).withMessage('La descripcion debe tener un minimo de 20 carateres y maximo de 1000'),
    
    body('caracteristics').notEmpty().withMessage('Tenes que escribir una descripcion').bail()
    .isLength({min: 20, max: 1000}).withMessage('La descripcion debe tener un minimo de 20 carateres y maximo de 1000'),
    
    body('price').notEmpty().withMessage('Tenes que escribir un precio de producto').bail()
    .isNumeric().withMessage('El precio debe ser un numero valido')
];

module.exports = productValidations;