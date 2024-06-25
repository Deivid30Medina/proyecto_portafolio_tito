import { initVideo } from './sectionhome.js';
import { initSlider  } from './publicactions/slider.js';
import { loadDataSliderPublicaciones  } from './publicactions/load_data.js';

const sections = [
    "./pages/section-video.html"
    ,"./pages/section-publicaciones.html"
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

async function loadAllSections(){
    const main = document.getElementById("idMain");
    for(let section of sections){
        const sectionConten = await loadSection(section);
        main.innerHTML += sectionConten;
    }
    // Después de cargar todas las secciones, inicializa el video
    initVideo();
    await loadDataSliderPublicaciones();
    initSlider();
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
