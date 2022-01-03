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

const ciudadesJSON = fs.readFileSync(folderData + '/ciudades.json', 'utf-8');
const ciudades = JSON.parse(ciudadesJSON);


const topThreeProperties = properties.filter( property => property.topThree && property.published);
const topThreePropertiesToFront = topThreeProperties.slice(0, 3);

const propertiesToRent = properties.filter(property => property.operationType == 'Alquiler' && property.published);
const toRentPropertiesQuantityToFront = 8;
const toRentPropertiesToFront = propertiesToRent.slice(0, toRentPropertiesQuantityToFront);

const propertiesToSale = properties.filter(property => property.operationType == 'Venta' && property.published);
const toSalePropertiesQuantityToFront = 8;
const toSalePropertiesToFront = propertiesToSale.slice(0, toSalePropertiesQuantityToFront);

// const newPropertiesQuantity = 8;
// const propertiesOrderedByDate = properties.sort(function(a, b) {
//     const [dayA, monthA, yearA] = a.date.split('/');
//     const [dayB, monthB, yearB] = b.date.split('/');
  
//     return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
//   });
//const propertiesOrderedByDateToFront = propertiesOrderedByDate.slice(0, newPropertiesQuantity);

const mainController = {
    index: (req, res) => {
        res.render('index', {
            toRentPropertiesToFront: toRentPropertiesToFront,
            toSalePropertiesToFront: toSalePropertiesToFront,
            topThreeProperties: topThreePropertiesToFront,
            tipoPropiedades: tipoPropiedades,
            comodidades: comodidades,
            ciudades: ciudades
        });
    }
}

module.exports = mainController;