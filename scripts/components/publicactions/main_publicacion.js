import { loadDataSliderPublicaciones  } from './load_data_publicacion.js';
import { initSlider  } from './slider-seccion-principal.js';


async function publicaciones(){
    await loadDataSliderPublicaciones();
    initSlider();
}

window.onload = () => {
    publicaciones();
};