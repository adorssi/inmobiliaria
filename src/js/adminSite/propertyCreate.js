const form = document.querySelector('.form-createProduct');
const fieldsets = form.getElementsByTagName('fieldset').length;
const next = document.querySelectorAll('.next');
let current_step = form.firstElementChild;
let formHeight = current_step.offsetHeight + 40;
form.style.minHeight = formHeight + 'px';

document.addEventListener('DOMContentLoaded', iniciarApp);

function iniciarApp() {
    for (let i = 0; i < next.length; i++) {
        next[i].addEventListener("click", siguienteItem);
    }
}

function siguienteItem(e) {
    formHeight = 40;
    current_step.classList.toggle('fieldset-hide');
    if(current_step.classList.contains('fieldset-show')) {
        current_step.classList.remove('fieldset-show')
    }
    current_step.nextElementSibling.classList.add('fieldset-show');
    current_step = current_step.nextElementSibling;
    
    for(children of current_step.children) {
        formHeight += children.clientHeight
    }
    form.style.height = formHeight + 'px';
}