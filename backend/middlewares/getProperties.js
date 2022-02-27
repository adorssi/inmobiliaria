const db = require('../database/models');

function getProperties(req, res, next) {
    req.properties = [];
    db.Propiedad.findAll({
        where: {
            published: 1
        }
    })
    .then(function(propiedades) {
        for(propiedad of propiedades) {
            req.properties.push(propiedad.dataValues);
        }
        next();
    })
}

module.exports =  getProperties;


