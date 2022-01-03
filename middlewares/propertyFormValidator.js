const { body } = require('express-validator');

const propertyFormValidator = [
    body('title').notEmpty().withMessage('El nombre es obligatorio')    
  ];

  module.exports = propertyFormValidator;