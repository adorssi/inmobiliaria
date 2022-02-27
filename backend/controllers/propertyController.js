const fs = require('fs');
const path = require('path');
const folderData = path.join(__dirname, '../data');
const { validationResult } = require('express-validator' );
const db = require('../database/models');
const { Op } = require("sequelize");

const operationTypes = ['Alquiler', 'Venta', 'Venta/Alquiler'];

const propertyController = {
    list: async (req, res, next) => {
        try {
            const properties = await db.Propiedad.findAll({
                include: [
                    {association: 'moneda'},
                    {association: 'tipoPropiedad'},
                    {association: 'localidad'}
                ]
            });
            res.render('./properties/propertyList', {
                properties: properties
            });
        } catch (error) {
            console.log(error);            
            next();
        }
        
    },
    detail: async (req, res) => {
        try {
            const property = await db.Propiedad.findByPk(req.params.id,{
                include: [
                    {association: 'moneda'},
                    {association: 'tipoPropiedad'},
                    {association: 'localidad'},
                    {association: 'comodidades'}
                ]
            });
            
            property.published ? res.render('./properties/propertyDetail', {property:property}) : res.redirect('/');

        } catch (error) {
            console.log(error);            
            next();
        }
    },
    createGET: async (req, res) => {

        const tipoPropiedades = db.TipoPropiedad.findAll();
        const ciudades = db.Localidad.findAll();
        const comodidades = db.Comodidad.findAll();

        try {
            const result = await Promise.all([tipoPropiedades, ciudades, comodidades]);
            
            res.render('./properties/propertyAdd', {
                tipoPropiedades: result[0],
                ciudades: result[1],
                comodidades: result[2]
            });

        } catch (error) {
            console.log(error);            
            next();
        }
    },
    createPOST: async (req, res) => {

        let galeria = [];
        if(req.files.galeria) {
            const imgGaleria = req.files.galeria;
            imgGaleria.forEach( item => {
                galeria.push(item.filename)
            });
        }
        let portada;
        if(req.files.portada) {
            portada = '/images/properties/' + req.files.portada[0].filename;
        } else {
            portada = '/images/properties/default.png';
        }
            try {
                let newProperty = await db.Propiedad.create({
                    title: req.body.title,
                    ref: Number(req.body.ref) || null,
                    moneda_id: Number(req.body.moneda_id),
                    price: Number(req.body.price) || null,
                    financiacion:  Number(req.body.financiacion),
                    address: req.body.address || null,
                    operationType: req.body.operationType,
                    superficieTer: Number(req.body.superficieTer) || null,
                    superficieCons: Number(req.body.superficieCons) || null,
                    bedrooms: Number(req.body.bedrooms) || null,
                    toilets: Number(req.body.toilets) || null,
                    garage: Number(req.body.garage) || null,
                    description: req.body.description,
                    images: portada,
                    galeria: JSON.stringify(galeria),
                    published: Number(req.body.published) || 0,
                    featured: Number(req.body.featured) || 0,
                    showPrice: Number(req.body.showPrice) || 0,
                    localidad_id: Number(req.body.localidad_id),
                    tipo_id: Number(req.body.tipo_id),
                });
                const comodidades = req.body.comodidad;

                comodidades.forEach(comodidad => {
                    db.PropiedadComodidad.create({
                        propiedad_id: newProperty.id,
                        comodidad_id: comodidad
                    })
                })
                
                res.redirect('/adminDash');

            } catch (error) {
                console.log(error);
            }
    },
    editGET: async (req, res) => {

        const tipoPropiedades = db.TipoPropiedad.findAll();
        const ciudades = db.Localidad.findAll();
        const comodidades = db.Comodidad.findAll();
        const monedas = db.Moneda.findAll();
        const property = db.Propiedad.findByPk(req.params.id,{
            include: [
                {association: 'moneda'},
                {association: 'tipoPropiedad'},
                {association: 'localidad'},
                {association: 'comodidades'}
            ]
        });

        try {
            const result = await Promise.all([tipoPropiedades, ciudades, comodidades, monedas, property]);
            
            res.json({
                tipoPropiedades: result[0],
                ciudades: result[1],
                comodidades: result[2],
                monedas: result[3],
                Propiedad: property
            });
            
        } catch (error) {
            console.log(error);
        }
    },
    editPUT: (req, res) => {
        const id = Number(req.params.id);
        let propertyItems = Object.assign({},req.body);
        propertyItems.price = Number(propertyItems.price);

        let image;
        if(req.file) {
            image = '/images/properties/' + req.file.filename;
        };

        properties.forEach( property => {
            if(property.id === id) {
                
                if(image != undefined) {
                    fs.unlink(path.join(__dirname, '../public') + property.image, (err) => {
                        if (err) {
                        console.error(err)
                        return
                        }
                    });
                }

                const imagenActual = property.image;
                const date = property.date;

                //Si los input tipo checkbox no estan marcados, directamente no vienen en el req.body, por lo tanto si la propiedad ya los tenia marcados, debo eliminarlos.
                for (const [key, value] of Object.entries(property)) {
                    if(value == 'on') {
                        delete property[key];
                    }
                }


                for(item in propertyItems) {
                    property[item] = propertyItems[item];
                }

                property.image = image || imagenActual;
                property.date = date;

                const propertyString = JSON.stringify(properties);
                fs.writeFileSync(folderData + '/properties.json', propertyString);
                res.render('./admin/adminDashboard', {
                    listadoPropiedades: properties,
                    tipoPropiedades: tipoPropiedades
                });
            }
        });
    },
    delete: (req, res) => {
        const id = Number(req.params.id);
        const property = properties.filter( property => property.id === id); 
        const image = property[0].image;
        properties = properties.filter( property => property.id != id);
        const propertyString = JSON.stringify(properties);
        fs.writeFileSync(folderData + '/properties.json', propertyString);
        fs.unlink(path.join(__dirname, '../public') + image, (err) => {
            if (err) {
              console.error(err)
              return
            }
        });
        res.render('./admin/adminDashboard', {
            listadoPropiedades: properties,
            tipoPropiedades: tipoPropiedades
        });
    },
    search: async (req, res, next) => {
        
        const bedrooms = Number(req.query.bedrooms);
        const operationType = req.query.operationType;
        const propertyType = req.query.propertyType;
        const min = Number(req.query.min) || 0;
        const max = Number(req.query.max) || 1000000 * 1000000;
        const localidad = req.query.ciudad;

        try {
            const properties = await db.Propiedad.findAll({
                include: [
                    {association: 'moneda'},
                    {association: 'tipoPropiedad'},
                    {association: 'localidad'}
                ],
                where: {
                    bedrooms: bedrooms || {[Op.like]:'%'},
                    operationType: operationType || {[Op.like]:'%'},
                    tipo_id: propertyType || {[Op.like]:'%'},
                    price: {
                        [Op.and]: {
                            [Op.gte]: min,
                            [Op.lte]: max,
                        }
                    },
                    localidad_id: localidad || {[Op.like]:'%'}
                }
            });

            res.render('./properties/searchResults', {
                properties: properties
            });

        } catch (error) {
            console.log(error);            
            next();
        }

        // function filtrarBedroom(propiedad) {
        //     if(bedrooms) {
        //         return propiedad.bedrooms == bedrooms;
        //     }
        //     return propiedad;
        // }
        // function filtrarOperacion(propiedad) {
        //     if(operationType) {
        //         return propiedad.operationType == operationType;
        //     }
        //     return propiedad;
        // }
        // function filtrarTipo(propiedad) {
        //     if(propertyType) {
        //         return propiedad.type == propertyType;
        //     }
        //     return propiedad;
        // }
        // function filtrarMinimo(propiedad) {
        //     if(min) {
        //         return propiedad.price >= min;
        //     }
        //     return propiedad;
        // }
        // function filtrarMaximo(propiedad) {
        //     if(max) {
        //         return propiedad.price <= max;
        //     }
        //     return propiedad;
        // }
        // function filtrarCiudad(propiedad) {
        //     if(ciudad) {
        //         return propiedad.city == ciudad;
        //     }
        //     return propiedad;
        // }
        // res.render('./properties/searchResults', {
        //     properties: propiedades,
        //     currencies: req.currencies,
        //     tipoPropiedades: tipoPropiedades,
        //     localidades: req.localidades,
        //     comodidades: comodidades,
        //     operationTypes: operationTypes
        // })
    }
}

module.exports = propertyController;