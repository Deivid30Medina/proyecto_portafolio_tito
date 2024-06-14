import { initVideo } from './sectionhome.js';
import { initSlider  } from './publicactions/slider.js';

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
    initSlider();
}

window.onload = () => {
    loadAllSections();
};
