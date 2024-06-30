import { initVideo } from './sectionhome.js';
import { initSlider  } from './publicactions/slider.js';
import { loadDataSliderPublicaciones  } from './publicactions/load_data.js';

const sections = [
    "./pages/section-video.html"
    ,"./pages/publicaciones/section-publicaciones.html"
    ,"./pages/linea-punteada.html"
    ,"./pages/section-ilustraciones.html"
    ,"./pages/linea-punteada.html"
    ,"./pages/section-sobremiVideos.html"
    ,"./pages/linea-punteada.html"
    ,"./pages/section-sobremiInformacion.html"
];



function loadSection(section){
    return fetch(section)
        .then(response => response.text())
        .catch(error => console.log("Erro al cargar la seccion: " + section));
}

async function publicaciones(){
    await loadDataSliderPublicaciones();
    initSlider();
}

function scrollToSectionFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionId = urlParams.get('section');
    
    // Imprimir los parámetros de la URL y el ID de la sección para depuración
    console.log(urlParams);
    console.log(sectionId);
    
    if (sectionId) {
        const sectionElement = document.getElementById(sectionId);
        
        // Imprimir el elemento de la sección para depuración
        console.log(sectionElement);
        
        if (sectionElement) {
            // Obtener la posición superior del elemento
            const topPosition = sectionElement.getBoundingClientRect().top + window.scrollY;
            
            // Desplazar la vista a la posición calculada
            window.scrollTo({ top: topPosition - 70, behavior: 'smooth' });
            
            // Actualizar la URL sin recargar la página
            history.replaceState(null, '', `${window.location.pathname}#${sectionId}`);
            
            console.log("Entro 1");
        } else {
            // Crear un observador de mutación para detectar cuándo se añade la sección al DOM
            const observer = new MutationObserver(() => {
                const sectionElement = document.getElementById(sectionId);
                if (sectionElement) {
                    const topPosition = sectionElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: topPosition - 70, behavior: 'smooth' });
                    
                    // Actualizar la URL sin recargar la página
                    history.replaceState(null, '', `${window.location.pathname}#${sectionId}`);
                    
                    console.log("Entro 2");
                    observer.disconnect();
                }
            });

            // Configurar el observador para observar cambios en el cuerpo del documento
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
}

async function loadAllSections(){
    const main = document.getElementById("idMain");
    for(let section of sections){
        const sectionConten = await loadSection(section);
        main.innerHTML += sectionConten;
    }
    // Después de cargar todas las secciones, inicializa el video
    initVideo();
    publicaciones();
    scrollToSectionFromQuery();
}

window.onload = () => {
    loadAllSections();
};


// import { initVideo } from './sectionhome.js';
// import { initSlider } from './publicactions/slider.js';

// // Mapeo de funciones de inicialización por sección
// const sectionInitFunctions = {
//     "video": initVideo,
//     "publicaciones": initSlider,
//     // Añade más secciones y sus funciones de inicialización aquí
// };

// const sections = [
//     "./pages/section-video.html",
//     "./pages/section-publicaciones.html",
//     "./pages/linea-punteada.html",
//     "./pages/section-ilustraciones.html",
//     "./pages/linea-punteada.html",
//     "./pages/section-sobremiVideos.html",
//     "./pages/linea-punteada.html",
//     "./pages/section-sobremiInformacion.html"
// ];

// function loadSection(section) {
//     return fetch(section)
//         .then(response => response.text())
//         .catch(error => console.log("Error al cargar la sección: " + section));
// }

// async function loadAllSections() {
//     const main = document.getElementById("idMain");
//     for (let section of sections) {
//         const sectionContent = await loadSection(section);
//         main.innerHTML += sectionContent;
//     }
//     // Después de cargar todas las secciones, inicializa los observadores
//     initObservers();
// }

// function initObservers() {
//     const observerOptions = {
//         threshold: 0.5 // Se activa cuando al menos el 50% de la sección está visible
//     };

//     const observerCallback = (entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const sectionId = entry.target.id;
//                 const initFunction = sectionInitFunctions[sectionId];
//                 if (initFunction) {
//                     initFunction();
//                     observer.unobserve(entry.target); // Deja de observar la sección después de inicializarla
//                 }
//             }
//         });
//     };

//     const observer = new IntersectionObserver(observerCallback, observerOptions);

//     // Observar todas las secciones cargadas
//     const sectionsToObserve = document.querySelectorAll('section');
//     sectionsToObserve.forEach(section => observer.observe(section));
// }

// window.onload = () => {
//     loadAllSections();
// };
