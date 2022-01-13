const mainImg = document.getElementById('main');
const galeria = document.querySelector('.property-detail--galeria');

document.addEventListener('DOMContentLoaded', propertyDetailStart);

function propertyDetailStart() {
    galeria.addEventListener('click', leerImagen);
}

function leerImagen(e) {
    e.preventDefault()
    if(e.target.classList.contains('main')) {
        console.log(e);
    }
}