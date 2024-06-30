// Agregar un evento de clic al botón "Prev" para mover el carrusel hacia atrás
document.getElementById('idBtnPrev').addEventListener('click', function() {
    moveCarousel('prev');
});

// Agregar un evento de clic al botón "Next" para mover el carrusel hacia adelante
document.getElementById('idBtnNex').addEventListener('click', function() {
    moveCarousel('next');
});

function transition(mainImage, newSrc){
    mainImage.style.transition = 'none'; // Desactivar la transición
    mainImage.style.opacity = 0; // Establecer opacidad a 0 para la transición de desvanecimiento
    mainImage.style.transform = 'scale(0)'; // Reducir ligeramente el tamaño para la transición

    // Después de un breve retraso, actualizar la imagen principal y aplicar la transición
    setTimeout(() => {
        mainImage.src = newSrc; // Actualizar la imagen principal
        // mainImage.style.transition = 'opacity 0.5s ease-in-out, transform 1s ease-in-out'; 
        mainImage.style.opacity = 1; // Restaurar la opacidad
        mainImage.style.transform = 'scale(1)'; // Restaurar el tamaño original
    }, 50);

}

/**
 * Función para mover el carrusel de imágenes.
 * @param {string} direction - La dirección en la que mover el carrusel ('next' o 'prev').
 */
function moveCarousel(direction) {
    // Obtener el elemento de la imagen principal
    const mainImage = document.getElementById('mainImage');
    // Obtener el contenedor del carrusel
    const sliderGallery = document.getElementById('idSliderGallery');
    // Obtener todos los elementos del carrusel
    const slides = sliderGallery.querySelectorAll('.PublicationDetail_slideer');

    // Comprobar si hay elementos en el carrusel
    if (slides.length > 0) {
        // Obtener el primer y el último elemento del carrusel
        const firstSlide = slides[0];
        const lastSlide = slides[slides.length - 1];
        // Guardar la imagen principal actual
        const currentMainImageSrc = mainImage.src;

        // Si la dirección es 'next', mover la primera imagen al contenedor principal y rotar
        if (direction === 'next') {
            // Obtener la nueva imagen de la primera imagen del carrusel
            const newSrc = firstSlide.querySelector('img').src;

            // Iniciar la transición
            transition(mainImage, newSrc);

            // Reemplazar la imagen en el carrusel y moverla al final
            firstSlide.querySelector('img').src = currentMainImageSrc; // Actualizar la primera imagen del carrusel
            sliderGallery.appendChild(firstSlide); // Mover la primera imagen al final del carrusel
        } 
        // Si la dirección es 'prev', mover la última imagen al contenedor principal y rotar
        else if (direction === 'prev') {
            // Obtener la nueva imagen de la última imagen del carrusel
            const newSrc = lastSlide.querySelector('img').src;

            // Iniciar la transición
            transition(mainImage, newSrc);

            // Reemplazar la imagen en el carrusel y moverla al inicio
            lastSlide.querySelector('img').src = currentMainImageSrc; // Actualizar la última imagen del carrusel
            sliderGallery.insertBefore(lastSlide, firstSlide); // Mover la última imagen al inicio del carrusel
        }
    }
}
