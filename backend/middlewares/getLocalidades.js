const db = require('../database/models');

function getLocalidades(req, res, next) {
    db.Localidad.findAll()
        .then(function(localidades) {
            req.localidades = localidades;
            next();
        });
}

module.exports =  getLocalidades;