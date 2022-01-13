const mobileMenu = document.querySelector('.mobile');
mobileMenu.addEventListener('click', mostrarMenu);

const barraLateral = document.querySelector('.barra-lateral');

function mostrarMenu() {
    mobileMenu.classList.toggle('active');
    barraLateral.classList.toggle('mostrarMenu');
}