const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const getLocalidades = require('../middlewares/getLocalidades');
const getTipoPropiedades = require('../middlewares/getTipoPropiedades');
const getMonedas = require('../middlewares/getMonedas');
const getProperties = require('../middlewares/getProperties');


router.get('/', getLocalidades, getTipoPropiedades, getMonedas, getProperties, mainController.index);


module.exports = router;