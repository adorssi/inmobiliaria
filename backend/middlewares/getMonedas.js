const db = require('../database/models');

function getMonedas(req, res, next) {
    db.Moneda.findAll()
        .then(function(monedas) {
            req.currencies = monedas;
            next();
        });
}

module.exports =  getMonedas;