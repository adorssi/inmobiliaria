const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userNoAutenticado = require('../middlewares/userNoAutenticado')
const userController = require('../controllers/userController');

const loginValidation = [
    body('email').notEmpty().withMessage('El correo electrónico es obligatorio').bail().isEmail().withMessage('El correo no tiene un formato válido'),
    body('password').notEmpty().withMessage('Debes introducir una contraseña')
];

router.get('/login', userController.login);
router.post('/login', userController.processLogin);

router.get('/register', userController.register);
router.post('/register', userController.processRegister);

router.get('/confirm/:token', userController.confirmAccount);

router.get('/logout', userController.logout);

module.exports = router;