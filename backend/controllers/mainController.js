const db = require('../database/models');

const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const folderData = path.join(__dirname, '../data');


// const newPropertiesQuantity = 8;
// const propertiesOrderedByDate = properties.sort(function(a, b) {
//     const [dayA, monthA, yearA] = a.date.split('/');
//     const [dayB, monthB, yearB] = b.date.split('/');
  
//     return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
//   });
//const propertiesOrderedByDateToFront = propertiesOrderedByDate.slice(0, newPropertiesQuantity);

const mainController = {
    index: async (req, res, next) => {
        const properties = await db.Propiedad.findAll({
            include: [
                {association: 'moneda'},
                {association: 'tipoPropiedad'},
                {association: 'localidad'}
            ],
            where: {
                published: 1
            }
        });
        const tipoPropiedades = db.TipoPropiedad.findAll();
        const localidades = db.Localidad.findAll();

        try {
            const result = await Promise.all([properties, tipoPropiedades, localidades]);
            res.render('./index', {
                properties: result[0],
                tipoPropiedades: result[1],
                localidades: result[2],
                userLogueado: req.session.userLogueado
            });
        } catch (error) {
            console.log(error);            
            next();
        }
        
    },
    // index: async (req, res, next) => {
    //     const properties = db.Propiedad.findAll({
    //         include: [
    //             {association: 'moneda'},
    //             {association: 'tipoPropiedad'},
    //             {association: 'localidad'}
    //         ],
    //         where: {
    //             published: 1
    //         }
    //     });
    //     const tipoPropiedades = db.TipoPropiedad.findAll();
    //     const localidades = db.Localidad.findAll();

    //     try {
    //         const result = await Promise.all([properties, tipoPropiedades, localidades]);
    //         res.render('./index', {
    //             properties: result[0],
    //             tipoPropiedades: result[1],
    //             localidades: result[2],
    //             userLogueado: req.session.userLogueado
    //         });
    //     } catch (error) {
    //         console.log(error);            
    //         next();
    //     }
        
    // },
}

module.exports = mainController;