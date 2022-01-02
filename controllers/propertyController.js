const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const folderData = path.join(__dirname, '../data');
const propertyJSON = fs.readFileSync(folderData + '/properties.json', 'utf-8');
let properties = JSON.parse(propertyJSON); 

const publishedProperties = properties.filter(property => property.published);

const tipoPropiedadesJSON = fs.readFileSync(folderData + '/tipo_propiedades.json', 'utf-8');
const tipoPropiedades = JSON.parse(tipoPropiedadesJSON);

const comodidadesJSON = fs.readFileSync(folderData + '/comodidades.json', 'utf-8');
const comodidades = JSON.parse(comodidadesJSON);

const departamentosJSON = fs.readFileSync(folderData + '/departamentos.json', 'utf-8');
const departamentos = JSON.parse(departamentosJSON);

const ciudadesJSON = fs.readFileSync(folderData + '/ciudades.json', 'utf-8');
const ciudades = JSON.parse(ciudadesJSON);

const operationTypes = ['Alquiler', 'Venta', 'Venta/Alquiler']

const propertyController = {
    list: (req, res) => {
        res.render('./properties/propertyList', {
            properties: publishedProperties,
            tipoPropiedades: tipoPropiedades,
            ciudades: ciudades,
            departamentos: departamentos,
            comodidades: comodidades,
            operationTypes: operationTypes});
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
        res.render('./properties/propertyEdit', {
            property: propertyObj[0],
            tipoPropiedades: tipoPropiedades,
            ciudades: ciudades,
            departamentos: departamentos,
            comodidades: comodidades,
            operationTypes: operationTypes
        });
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
    search: (req, res) => {
        const {bedrooms, operationType, propertyType, min, max, ciudad} = req.query;
        const propiedades = properties.filter(filtrarBedroom).filter(filtrarOperacion).filter(filtrarTipo).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarCiudad)

        function filtrarBedroom(propiedad) {
            if(bedrooms) {
                return propiedad.bedrooms == bedrooms;
            }
            return propiedad;
        }
        function filtrarOperacion(propiedad) {
            if(operationType) {
                return propiedad.operationType == operationType;
            }
            return propiedad;
        }
        function filtrarTipo(propiedad) {
            if(propertyType) {
                return propiedad.type == propertyType;
            }
            return propiedad;
        }
        function filtrarMinimo(propiedad) {
            if(min) {
                return propiedad.price >= min;
            }
            return propiedad;
        }
        function filtrarMaximo(propiedad) {
            if(max) {
                return propiedad.price <= max;
            }
            return propiedad;
        }
        function filtrarCiudad(propiedad) {
            if(ciudad) {
                return propiedad.city == ciudad;
            }
            return propiedad;
        }
        res.render('./properties/searchResults', {
            propiedades: propiedades,
            tipoPropiedades: tipoPropiedades,
            ciudades: ciudades,
            departamentos: departamentos,
            comodidades: comodidades,
            operationTypes: operationTypes
        })
    }
}

module.exports = propertyController;