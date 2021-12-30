const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const folderData = path.join(__dirname, '../data');
const propertiesJSON = fs.readFileSync(folderData + '/properties.json', 'utf-8');
let properties = JSON.parse(propertiesJSON);

const tipoPropiedadesJSON = fs.readFileSync(folderData + '/tipo_propiedades.json', 'utf-8');
const tipoPropiedades = JSON.parse(tipoPropiedadesJSON);

const comodidadesJSON = fs.readFileSync(folderData + '/comodidades.json', 'utf-8');
const comodidades = JSON.parse(comodidadesJSON);

const departamentosJSON = fs.readFileSync(folderData + '/departamentos.json', 'utf-8');
const departamentos = JSON.parse(departamentosJSON);

const ciudadesJSON = fs.readFileSync(folderData + '/ciudades.json', 'utf-8');
const ciudades = JSON.parse(ciudadesJSON);

const featuredProperties = properties.filter( property => {
    if(property.featured && property.published) {
        return property;
    }
});


const featuredQuantityProperties = 8;
const featuredPropertiesToFront = featuredProperties.slice(0, featuredQuantityProperties);

const topThreeProperties = properties.filter( property => property.topThree);
const topThreePropertiesToFront = topThreeProperties.slice(0, 3);

const newPropertiesQuantity = 8;
const propertiesOrderedByDate = properties.sort(function(a, b) {
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
  
    return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
  });
const propertiesOrderedByDateToFront = propertiesOrderedByDate.slice(0, newPropertiesQuantity);

const mainController = {
    index: (req, res) => {
        res.render('index', {
            featuredProperties: featuredPropertiesToFront,
            newProperties: propertiesOrderedByDateToFront,
            topThreeProperties: topThreePropertiesToFront,
            tipoPropiedades: tipoPropiedades,
            comodidades: comodidades,
            ciudades: ciudades
        });
    }
}

module.exports = mainController;