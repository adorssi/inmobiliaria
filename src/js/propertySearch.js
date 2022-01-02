const moreOptions = document.getElementById('more-options');
const arrow = document.getElementById('arrow');
const bedrooms = document.getElementById('bedrooms');
const operationType = document.getElementById('operationType');
const propertyType = document.getElementById('propertyType');
const minimo = document.getElementById('min');
const maximo = document.getElementById('max');
const ciudad = document.getElementById('ciudad');
const adicionales = document.querySelector('.adicionales');

const datosBusqueda = {
    bedrooms: '',
    operationType: '',
    propertyType: '',
    min: '',
    max: '',
    ciudad: ''
}

moreOptions.addEventListener('click', (e) => {
    e.preventDefault();
    adicionales.classList.toggle('mostrar');
    arrow.classList.toggle('fa-arrow-down');
    arrow.classList.toggle('fa-arrow-up');
})

bedrooms.addEventListener('change', e => {
    datosBusqueda.bedrooms = e.target.value;
});

operationType.addEventListener('change', e => {
    datosBusqueda.operationType = e.target.value;
});

propertyType.addEventListener('change', e => {
    datosBusqueda.propertyType = e.target.value;
});

minimo.addEventListener('change', e => {
    datosBusqueda.min = e.target.value;
});

maximo.addEventListener('change', e => {
    datosBusqueda.max = e.target.value;
});

ciudad.addEventListener('change', e => {
    datosBusqueda.ciudad = e.target.value;
});