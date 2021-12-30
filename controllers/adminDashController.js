const fs = require('fs');
const path = require('path');
const folderData = path.join(__dirname, '../data');
const productsJSON = fs.readFileSync(folderData + '/properties.json', 'utf-8');
const properties = JSON.parse(productsJSON);

const tipoPropiedadesJSON = fs.readFileSync(folderData + '/tipo_propiedades.json', 'utf-8');
const tipoPropiedades = JSON.parse(tipoPropiedadesJSON);

const comodidadesJSON = fs.readFileSync(folderData + '/comodidades.json', 'utf-8');
const comodidades = JSON.parse(comodidadesJSON);

const departamentosJSON = fs.readFileSync(folderData + '/departamentos.json', 'utf-8');
const departamentos = JSON.parse(departamentosJSON);

const ciudadesJSON = fs.readFileSync(folderData + '/ciudades.json', 'utf-8');
const ciudades = JSON.parse(ciudadesJSON);


const adminDashboard={
    adminDashboard: (req, res) => {
        res.render('./admin/adminDashboard', {
            listadoPropiedades: properties,
            tipoPropiedades: tipoPropiedades,
            ciudades: ciudades,
            departamentos: departamentos,
            comodidades: comodidades
        });
    },
    settings: (req, res) => {
        res.send('hola')
    }
}

module.exports=adminDashboard;