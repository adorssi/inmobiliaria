const fs = require('fs');
const path = require('path');

const folderData = path.join(__dirname, '../data');

const productsJSON = fs.readFileSync(folderData + '/products.json', 'utf-8');
let products = JSON.parse(productsJSON);

const papeleraJSON = fs.readFileSync(folderData + '/papelera.json', 'utf-8');
let papelera = JSON.parse(papeleraJSON);

const categoriesJSON = fs.readFileSync(folderData + '/categories.json', 'utf-8');
let categories = JSON.parse(categoriesJSON);

const Product = {
    aLaPapelera: function(producto) {
        papelera.unshift(producto);
        const papeleraString = JSON.stringify(papelera);
        fs.writeFileSync(folderData + '/papelera.json', papeleraString);
    },
    restoreProduct: function(productToRestore) {
        papelera = papelera.filter(product => product.id != productToRestore.id);
        
        productToRestore.published = false;
        products.unshift(productToRestore);
        
        const papeleraString = JSON.stringify(papelera);
        fs.writeFileSync(folderData + '/papelera.json', papeleraString);

        const productString = JSON.stringify(products);
        fs.writeFileSync(folderData + '/products.json', productString);

    
    }
}

module.exports = Product;