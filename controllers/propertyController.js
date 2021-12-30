const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const folderData = path.join(__dirname, '../data');
const propertyJSON = fs.readFileSync(folderData + '/properties.json', 'utf-8');
let properties = JSON.parse(propertyJSON); 

const tipoPropiedadesJSON = fs.readFileSync(folderData + '/tipo_propiedades.json', 'utf-8');
const tipoPropiedades = JSON.parse(tipoPropiedadesJSON);

const comodidadesJSON = fs.readFileSync(folderData + '/comodidades.json', 'utf-8');
const comodidades = JSON.parse(comodidadesJSON);

const departamentosJSON = fs.readFileSync(folderData + '/departamentos.json', 'utf-8');
const departamentos = JSON.parse(departamentosJSON);

const ciudadesJSON = fs.readFileSync(folderData + '/ciudades.json', 'utf-8');
const ciudades = JSON.parse(ciudadesJSON);

const propertyController = {
    list: (req, res) => {
        publishedProperties = properties.filter( property => property.published === true);
        res.render('./properties/propertyList', {properties: publishedProperties, categories: categories});
    },
    detail: (req, res) => {
        const propertyId = Number(req.params.id);
        const propertyObj = properties.filter( property => property.id === propertyId);

        
        let propertyComodidades = [];
        //Recorro las comodidades que vienen en la propiedad y comparo las coincidencias con las comodidades cargadas, si coinciden las agrego a propertyComodidades
        for(field in propertyObj[0]) {
            for(comodidad of comodidades) {
                if(field == comodidad.name) {
                    propertyComodidades.push(field)
                }
            }
        }

        if(propertyObj.length > 0) {
            res.render('./properties/propertyDetail', {
                property: propertyObj[0],
                ciudades: ciudades,
                tipoPropiedades: tipoPropiedades,
                propertyComodidades: propertyComodidades
            });
        } else {
            res.redirect('/')
        }
    },
    createGET: (req, res) => {
        res.render('./properties/propertyCreate.ejs',{
            tipoPropiedades: tipoPropiedades,
            ciudades: ciudades,
            departamentos: departamentos,
            comodidades: comodidades
        })
    },
    createPOST: (req, res) => {
        const id = Date.now();

        let image;
        if(req.file) {
            image = '/images/properties/' + req.file.filename;
        };
        const defaultImg = '/images/default.png';

        let propertyItems = Object.assign({},req.body);

        propertyItems.price = Number(propertyItems.price);
        
      
        const propertyObj = {
            id,
            ...propertyItems,
            image: image || defaultImg,
            date: new Date().toLocaleDateString()
        }

        properties.unshift(propertyObj);
        const propertyString = JSON.stringify(properties);
        fs.writeFileSync(folderData + '/properties.json', propertyString);
        res.render('./admin/adminDashboard', {
            listadoPropiedades: properties,
            tipoPropiedades: tipoPropiedades
        });
    },
    editGET: (req, res) => {
        const propertyId = Number(req.params.id);
        const propertyObj = properties.filter( property => property.id === propertyId)
        res.render('./properties/propertyEdit', {property: propertyObj[0]});
    },
    editPUT: (req, res) => {
        const id = Number(req.params.id);
        let {title, currency, price, category, freeShipping, published, description} = req.body;
        let featured = false;
        let image;

        if(req.file) {
            image = '/images/properties/' + req.file.filename;
        };
        if(req.body.featured) {
            featured = true;
        }
        published === 'true' ? published = true : published = false;

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

                property.title = title;
                property.currency = currency;
                property.price = price;
                property.category = category;
                property.freeShipping = freeShipping;
                property.published = published;
                property.image = image || property.image;
                property.featured = featured;
                property.description = description

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
    }
}

module.exports = propertyController;