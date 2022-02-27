const mainImg = document.getElementById('main');
const galeria = document.querySelector('.property-detail--galeria');
const propertyDetail = document.querySelector('.property-detail');
const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', propertyDetailStart);

function propertyDetailStart() {
    galeria.addEventListener('click', leerImagen);
    mainImg.addEventListener('click', abrirImagen);
    
}

function leerImagen(e) {
    if(e.target.classList.contains('miniatura')) {
        mainImg.src = e.target.src;
    }
}

function abrirImagen(e) {
    const img = e.target.src;
    const overlay = document.createElement('div');

    body.onclick = (e) => {
        if(e.target.classList.contains('overlay-image-detail')) {
            overlay.remove()
        }
    }

    overlay.classList.add('overlay-image-detail');

    overlay.innerHTML = `
    <div class="img-fullsize-container">
    <i class="fas fa-caret-left anterior"></i>
    <img src="${img}" alt="Imagen Propiedad" class="img-fullsize">
    <i class="fas fa-caret-right siguiente"></i>
    </div>
    `
    body.appendChild(overlay);
}