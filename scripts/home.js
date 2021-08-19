// API KEY:
let apiKey = '66c34023cSlGF6JEhmYrNI0ejT49ZBFs';


let inputBuscador = document.getElementById('input-buscador');
let bloqueBuscador = document.getElementById('buscador');
let iconBuscar = document.getElementById('buscador-lupa');
let btnBuscar = document.getElementById('buscador-lupa-gris');
let btnCerrarBusqueda = document.getElementById('cerrar-busqueda');
let listaSugerencias = document.getElementById('buscador-sugerencias');

let offsetBusqueda = 0;
let resultadosBusquedaGIFOS = document.getElementById('resultados-busqueda');
let btnVerMasResultados = document.getElementById('resultados-vermas');

let busqueda;

let modalMobile = document.createElement("div");
let modalDesktop = document.createElement("div");

// BUSCADOR

inputBuscador.addEventListener('keyup', buscadorActivo);

function buscadorActivo() {
    busqueda = inputBuscador.value;

    bloqueBuscador.classList.remove('buscador');
    bloqueBuscador.classList.add('buscador-activo');
    iconBuscar.style.display = "none";
    btnCerrarBusqueda.style.display = "block";


    if (busqueda.length >= 1) {
        fetch(`https://api.giphy.com/v1/tags/related/${busqueda}?api_key=${apiKey}&limit=4`)
            .then(response => response.json())
            .then(data => {
                sugerenciasData(data);
            })
            .catch(err => {
                console.error("error al traer sugerencias de busqueda", err);
            })
    } else {
 
        cerrarBoxBusqueda();
    }
}



function sugerenciasData(data) {
    let sugerencia = data.data;
    listaSugerencias.innerHTML = `
    <li class="sugerencia">
        <img src="./images/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" >${sugerencia[0].name}</p>
    </li>
    <li class="sugerencia">
        <img src="./images/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" >${sugerencia[1].name}</p>
    </li>
    <li class="sugerencia">
        <img src="./images/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" >${sugerencia[2].name}</p>
    </li>
    <li class="sugerencia">
        <img src="./images/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" >${sugerencia[3].name}</p>
    </li>`;
}

//funcion sugerencias: 
listaSugerencias.addEventListener('click', function (li) {
    inputBuscador.value = li.target.textContent;
    busquedaGifos();
})

//cierro busqueda:
btnCerrarBusqueda.addEventListener('click', limpiarBusqueda);

function limpiarBusqueda() {
    inputBuscador.value = "";
    inputBuscador.placeholder = "Busca GIFOS y más";
    bloqueBuscador.classList.add('buscador');
    bloqueBuscador.classList.remove('buscador-activo');
    iconBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";
}

btnBuscar.addEventListener('click', busquedaGifos);
inputBuscador.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        busquedaGifos();
    }
});


//Resultados de la busqueda
function busquedaGifos() {
    event.preventDefault();
    let urlBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offsetBusqueda}&q=`;
    let strBusqueda = inputBuscador.value.trim();
    urlBusqueda = urlBusqueda.concat(strBusqueda);


    fetch(urlBusqueda)
        .then(response => response.json())
        .then(content => {
            resultadosBusquedaGIFOS.innerHTML = "";

            let contenedorResultadosBusqueda = document.getElementById('resultados-busqueda-contenedor');
            contenedorResultadosBusqueda.style.display = "block";

            let tituloBusqueda = document.getElementById('titulo-busqueda');
            tituloBusqueda.innerHTML = inputBuscador.value;

            if (content.data == 0) {
                resultadosBusquedaGIFOS.innerHTML = `
                    <div class="busqueda-error-contenedor">
                    <img src="./images/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" class="busqueda-error-img">
                    <h3 class="busqueda-error-texto">Intenta con otra búsqueda</h3>
                    </div>
                    `;
                btnVerMasResultados.style.display = "none";
            } else {
                for (let i = 0; i < content.data.length; i++) {
                    traerBusqueda(content.data[i]);
                }
            }
        })
        .catch(error => {
            console.log("error busqueda" + error)
        })

    cerrarBoxBusqueda();
}


function traerBusqueda(content) {
    resultadosBusquedaGIFOS.innerHTML += `
                <div class="resultados-gif-box" onclick="maxGifMobile('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
                <div class="gif-acciones-resultados">
                    <div class="iconos-acciones-gif">
                        <button class="iconos-acciones-box favorito" onclick="agregarFavoritoBusqueda('${content.id}')">
                            <img src="./images/icon-fav-hover.svg" alt="icon-favorito" id="icon-fav-${content.id}">
                        </button>
                        <button class="iconos-acciones-box download" onclick="descargarGif('${content.images.downsized.url}', '${content.slug}')">
                            <img src="./images/icon-download.svg" alt="icon-dowlnoad">
                        </button>
                        <button class="iconos-acciones-box max" onclick="maxGifDesktop('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
                            <img src="./images/icon-max.svg" alt="icon-max">
                        </button>
                    </div>
                    <div class="textos-descripcion-gif-resultados">
                        <p class="user-gif-resultados">${content.username}</p>
                        <p class="titulo-gif-resultados">${content.title}</p>
                    </div>
                </div>
                <img src="${content.images.downsized.url}" alt="${content.id}" class="resultados-gif" >
            </div>
                `;
}



function cerrarBoxBusqueda() {
    bloqueBuscador.classList.add('buscador');
    bloqueBuscador.classList.remove('buscador-activo');
    iconBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";
}


// Boton Ver mas: 
btnVerMasResultados.addEventListener('click', verMasResultados);

function verMasResultados() {
    offsetBusqueda = offsetBusqueda + 12;
    busquedaGifosVerMas();
}

function busquedaGifosVerMas() {
    event.preventDefault();
    let urlBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offsetBusqueda}&q=`;
    let strBusqueda = inputBuscador.value.trim();
    urlBusqueda = urlBusqueda.concat(strBusqueda);

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(content => {
            let contenedorResultadosBusqueda = document.getElementById('resultados-busqueda-contenedor');
            contenedorResultadosBusqueda.style.display = "block";

            let tituloBusqueda = document.getElementById('titulo-busqueda');
            tituloBusqueda.innerHTML = inputBuscador.value;

            if (content.data == 0) {
                resultadosBusquedaGIFOS.innerHTML = `
                    <div class="busqueda-error-contenedor">
                    <img src="./images/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" class="busqueda-error-img">
                    <h3 class="busqueda-error-texto">Intenta con otra búsqueda</h3>
                    </div>
                    `;
                btnVerMasResultados.style.display = "none";
            } else {
                for (let i = 0; i < content.data.length; i++) {
                    traerBusqueda(content.data[i]);
                }
            }
        })
        .catch(error => {
            console.log("error busqueda ver mas" + error)
        })
}



//FUNCIONES GIF:

//FAVORITOS
function agregarFavoritoBusqueda(gif){
    let iconFav = document.getElementById('icon-fav-' + gif);
    iconFav.setAttribute("src", "./images/icon-fav-active.svg");

    agregarFavorito(gif);
}

function agregarFavorito(gif) {

    if (favoritosString == null) {
        favoritosArray = [];

    } else {

        favoritosArray = JSON.parse(favoritosString);
    }

    favoritosArray.push(gif);
    favoritosString = JSON.stringify(favoritosArray);
    localStorage.setItem("gifosFavoritos", favoritosString);
}


//DOWNLOAD GIF
async function descargarGif(gifImg, gifNombre) {
    let blob = await fetch(gifImg).then(img => img.blob());;
    invokeSaveAsDialog(blob, gifNombre + ".gif");
}


//MAX GIF MOBILE 
function maxGifMobile(img, id, slug, user, title) {
    if (window.matchMedia("(max-width: 1023px)").matches) {
        modalMobile.style.display = "block";
        modalMobile.innerHTML = `
    <button class="modal-btn-close" onclick="cerrarModalMobile()"><img src="./images/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-textos">
            <p class="modal-user">${user}</p>
            <p class="modal-titulo">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="agregarFavoritoMaxMobile('${id}')"><img src="./images/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-mob-${id}"></button>
            <button class="modal-btn" onclick="descargarGif('${img}', '${slug}')"><img src="./images/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>
    `;
        modalMobile.classList.add("modal-activado");
        document.body.appendChild(modalMobile);
    }
}

function cerrarModalMobile() {
    modalMobile.style.display = "none";
} 

function agregarFavoritoMaxMobile(gif){

    let iconFavMaxMobile = document.getElementById('icon-fav-max-mob-' + gif);
    iconFavMaxMobile.setAttribute("src", "./images/icon-fav-active.svg");

    agregarFavorito(gif);
}


//MAX GIF DESKTOP
function maxGifDesktop(img, id, slug, user, title){
    if (window.matchMedia("(min-width: 1023px)").matches){
        modalDesktop.style.display = "block";
        modalDesktop.innerHTML = `
    <button class="modal-btn-close" onclick="cerrarModalDesktop()"><img src="./images/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-textos">
            <p class="modal-user">${user}</p>
            <p class="modal-titulo">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="agregarFavoritoMax('${id}')"><img src="./images/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-${id}"></button>
            <button class="modal-btn" onclick="descargarGif('${img}', '${slug}')"><img src="./images/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>
    `;
    modalDesktop.classList.add("modal-activado");
        document.body.appendChild(modalDesktop);
    }
}

function cerrarModalDesktop() {
    modalDesktop.style.display = "none";
} 

function agregarFavoritoMax(gif){

    let iconFavMax = document.getElementById('icon-fav-max-' + gif);
    iconFavMax.setAttribute("src", "./images/icon-fav-active.svg");

    agregarFavorito(gif);
}