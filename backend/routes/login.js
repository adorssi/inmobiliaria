// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const userNoAutenticado = require('../middlewares/userNoAutenticado')
// const userController = require('../controllers/userController');

// const loginValidation = [
//     body('email').notEmpty().withMessage('El correo electrónico es obligatorio').bail().isEmail().withMessage('El correo no tiene un formato válido'),
//     body('password').notEmpty().withMessage('Debes introducir una contraseña')
// ];

// router.get('/', userController.login);

// router.post('/', loginValidation, userController.processLogin);

// module.exports = router;