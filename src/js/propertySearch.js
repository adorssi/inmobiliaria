const moreOptions = document.getElementById('more-options');
const bedrooms = document.getElementById('bedrooms');
const operationType = document.getElementById('operation');
const propertyType = document.getElementById('type');

const datosBusqueda = {
    bedrooms: '',
    operationType: '',
    propertyType: ''
}

bedrooms.addEventListener('change', e => {
    datosBusqueda.bedrooms = e.target.value;
});

operationType.addEventListener('change', e => {
    datosBusqueda.operationType = e.target.value;
});

propertyType.addEventListener('change', e => {
    datosBusqueda.propertyType = e.target.value;
});