const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuIcon.addEventListener('click', mostrarMenu);

function mostrarMenu() {
    console.log('mobileeee');
    mobileMenu.classList.toggle('active')
}