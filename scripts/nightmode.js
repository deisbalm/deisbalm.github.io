//MODO OSCURO
let body = document.getElementById('body');
let url = window.location.pathname;

let darkModeStorage = localStorage.getItem("darkMode");
let darkModeBtn = document.getElementById('menu-modo');
darkModeBtn.addEventListener('click', changeMode);

//darkmode  activado
let darkModeActive = () => {
    body.classList.add('body-dark');
    darkModeBtn.innerHTML = "Modo diurno";

    changeIcons();
    iconCreateGif();

    if (url === "/index.html" || url === "/gifos/index.html") {

        searchIcon();
    }

    //crear gifos
    if (url === "/creategifo.html" || url === "/gifos/creategifo.html") {
        //funcion cambiar imagenes camaras
        changeCamera();
    }

    localStorage.setItem("darkMode", "activado");
}

//arkmode desactivado
let darkModeDesactivate = () => {
    body.classList.remove('body-dark');
    darkModeBtn.innerHTML = "Modo nocturno";

    changeIcons();
    iconCreateGif();

    if (url === "/index.html" || url === "/gifos/index.html") {
        searchIcon();
    }

    //crear gifos
    if (url === "/creategifo.html" || url === "/gifos/creategifo.html") {
        changeCamera();
    }

    localStorage.setItem("darkMode", null);
}

//estado del LS
if (darkModeStorage === "activado") {
    darkModeActive();
}

//cambiar mode
function changeMode() {
    darkModeStorage = localStorage.getItem("darkMode");

    if (darkModeStorage !== "activado") {
        darkModeActive();
    } else {
        darkModeDesactivate();
    }
}




//imagenes, iconos
function changeIcons() {
    let iconMobile = document.getElementById('logo');
    let iconDesktop = document.getElementById('logo-desktop');

    if (darkModeBtn.innerHTML == 'Modo nocturno') {
        iconDesktop.setAttribute("src", "./images/logo-desktop.svg");
        iconMobile.setAttribute("src", "./images/logo-mobile.svg");
    } else {
        iconDesktop.setAttribute("src", "./images/logo-desktop-modo-noc.svg");
        iconMobile.setAttribute("src", "./images/logo-mobile-modo-noc.svg");
    }
}

function iconCreateGif() {
    let createGif = document.querySelector('.mas-violeta');
    let createGifHover = document.querySelector('.mas-blanco');

    if (darkModeBtn.innerHTML == 'Modo nocturno') {
        createGif.setAttribute("src", "./images/button-crear-gifo.svg");
        createGifHover.setAttribute("src", "./images/button-crear-gifo-hover.svg");
    } else {
        createGif.setAttribute("src", "./images/button-crear-gifo-hover.svg");
        createGifHover.setAttribute("src", "./images/button-crear-gifo-dark.svg");
    }

}

function searchIcon() {

    if (darkModeBtn.innerHTML == 'Modo nocturno') {
       iconSearch.setAttribute("src", "./images/icon-search.svg");
        closeSearch.setAttribute("src", "./images/button-close.svg");
    } else {
       iconSearch.setAttribute("src", "./images/icon-search-mod-noc.svg");
        closeSearch.setAttribute("src", "./images/button-close-modo-noc.svg");
    }

}

function changeCamera() {
    let cam = document.getElementById('camara-ilustracion');
    let movie = document.getElementById('pelicula-ilus');

    if (darkModeBtn.innerHTML == 'Modo nocturno') {
        cam.setAttribute("src", "./images/camara.svg");
        movie.setAttribute("src", "./images/pelicula.svg");
    } else {
        cam.setAttribute("src", "./images/camara-modo-noc.svg");
        movie.setAttribute("src", "./images/pelicula-modo-noc.svg");
    }
}