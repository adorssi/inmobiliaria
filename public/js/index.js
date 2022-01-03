const contenedor=document.querySelector(".contenedor");document.addEventListener("DOMContentLoaded",()=>{screen.width<=768&&contenedor.insertAdjacentElement("beforebegin","<%- include('./partials/propertyFilters.ejs', {helpClass: 'mobile'}) %>")});
//# sourceMappingURL=index.js.map
