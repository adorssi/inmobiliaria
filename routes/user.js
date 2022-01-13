const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userNoAutenticado = require('../middlewares/userNoAutenticado')
const userController = require('../controllers/userController');

const loginValidation = [
    body('email').notEmpty().withMessage('El correo electrónico es obligatorio').bail().isEmail().withMessage('El correo no tiene un formato válido'),
    body('password').notEmpty().withMessage('Debes introducir una contraseña')
];

router.get('/login', userNoAutenticado, userController.login);

router.post('/login', loginValidation, userController.processLogin);

router.get('/logout', userController.logout);

module.exports = router;