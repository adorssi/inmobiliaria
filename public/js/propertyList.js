
const listaPropiedades = document.querySelector('.lista-propiedades');
const addToFavourite = document.querySelector('.heart')

eventListeners();

function eventListeners() {
    listaPropiedades.addEventListener('click', leerPropiedad);
    addToFavourite.addEventListener('click', agregarFavorito)
}

function leerPropiedad(e) {
    console.log(e.target);
    //const propertyId = e.target.getAttribute('data-id');
    //location.href = '/properties/detail/' + propertyId;
}

function agregarFavorito(e) {
    console.log(e.target.parentElement);
}