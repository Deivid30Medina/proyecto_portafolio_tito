const ulEnlaces = document.getElementById("idUlEnlaces");
const abrir = document.getElementById("idBtnAbrir");
const cerrar = document.getElementById("idBtnCerrar");
const navbar = document.getElementById("idNavbar");

function mostrarUlEnlaces(){
    ulEnlaces.classList.add("ul-visible");
    navbar.classList.add("navbarOpacity");
}

function ocultarUlEnlaces(){
    ulEnlaces.classList.remove("ul-visible");
    navbar.classList.remove("navbarOpacity");
}


abrir.addEventListener("click", mostrarUlEnlaces)

cerrar.addEventListener("click", ocultarUlEnlaces)