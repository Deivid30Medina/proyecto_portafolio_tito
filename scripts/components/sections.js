import { initVideo } from './sectionhome.js';
import { initSlider  } from './publicactions/slider-seccion-principal.js';
import { loadDataSliderPublicaciones  } from './publicactions/load_data.js';

const sections = [
    "./pages/section-video.html"
    ,"./pages/publicaciones/section-publicaciones.html"
    ,"./pages/linea-punteada.html"
    ,"./pages/ilustraciones/section-ilustraciones.html"
    ,"./pages/linea-punteada.html"
    ,"./pages/sobre_mi/sobremi_videos/section-sobremiVideos.html"
    ,"./pages/linea-punteada.html"
    ,"./pages/sobre_mi/sobremi_informacion/section-sobremiInformacion.html"
    ,"./pages/linea-punteada.html"
    ,"./pages/sobre_mi/sobremi_recomendados/section_sobremi_recomendados.html"
    ,"./pages/linea-punteada.html"
    ,"./pages/contacto/contacto.html"
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

function ilustraciones(){
    let rutaArchivo = "./scripts/components/publicactions/2-carruselPublicaciones.js";
    let rutaArchivoDos = "./scripts/components/publicactions/4-carruselPublicacionesInterno-copy.js";

    let nuevoScript = document.createElement('script');
    nuevoScript.src = rutaArchivo;
    let nuevoScriptDos = document.createElement('script');
    nuevoScriptDos.src = rutaArchivoDos;
    
    // Insertar el nuevo script al final del body
    document.body.appendChild(nuevoScript);
    document.body.appendChild(nuevoScriptDos);
}

function scrollToSectionFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionId = urlParams.get('section');
        
    if (sectionId) {
        const sectionElement = document.getElementById(sectionId);
        
        // Imprimir el elemento de la sección para depuración
        console.log(sectionElement);
        
        if (sectionElement) {
            // Obtener la posición superior del elemento
            const topPosition = sectionElement.getBoundingClientRect().top + window.scrollY;
            
            // Desplazar la vista a la posición calculada
            window.scrollTo({ top: topPosition - 60, behavior: 'smooth' });
            
            // Actualizar la URL sin recargar la página
            history.replaceState(null, '', `${window.location.pathname}#${sectionId}`);
            
        } else {
            // Crear un observador de mutación para detectar cuándo se añade la sección al DOM
            const observer = new MutationObserver(() => {
                const sectionElement = document.getElementById(sectionId);
                if (sectionElement) {
                    const topPosition = sectionElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: topPosition - 70, behavior: 'smooth' });
                    
                    // Actualizar la URL sin recargar la página
                    history.replaceState(null, '', `${window.location.pathname}#${sectionId}`);
                    
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

function sobreMi(){
    let rutaArchivo = "./scripts/components/sobre_mi/carruselRecomendaciones.js";

    let nuevoScript = document.createElement('script');
    nuevoScript.src = rutaArchivo;
    
    // Insertar el nuevo script al final del body
    document.body.appendChild(nuevoScript);
}

function contactoMap(){
    let rutaArchivo = "./scripts/components/contacto/mapa.js";

    let nuevoScript = document.createElement('script');
    nuevoScript.src = rutaArchivo;
    
    // Insertar el nuevo script al final del body
    document.body.appendChild(nuevoScript);
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
    ilustraciones();
    sobreMi();
    contactoMap()
    scrollToSectionFromQuery();
}

window.onload = () => {
    loadAllSections();
};
