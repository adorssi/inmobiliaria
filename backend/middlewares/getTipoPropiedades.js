const db = require('../database/models');

function getTipoPropiedades(req, res, next) {
    db.TipoPropiedad.findAll()
        .then(function(tiposPropiedades) {
            req.tiposPropiedades = tiposPropiedades;
            next();
        });
}

module.exports =  getTipoPropiedades;