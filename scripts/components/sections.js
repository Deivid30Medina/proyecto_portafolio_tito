import { initVideo } from './sectionhome.js';

const sections = [
    "./pages/section-video.html"
    ,"./pages/section-publicaciones.html"
    ,"./pages/section-ilustraciones.html"
    ,"./pages/section-sobremiVideos.html"
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
}

window.onload = () => {
    loadAllSections();
};