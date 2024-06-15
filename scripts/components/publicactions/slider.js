// // slider.js

// /**
//  * Función para inicializar el slider.
//  */
// export function initSlider() {
//     // Selecciona el contenedor del slider, el botón previo y el botón siguiente
//     const scrollContainer = document.querySelector(".sliderGallery");
//     const prevBtn = document.getElementById("idBtnPrev");
//     const nextBtn = document.getElementById("idBtnNex");

//     // Verifica que todos los elementos necesarios existen
//     if (scrollContainer && prevBtn && nextBtn) {
//         const containerWidth = scrollContainer.offsetWidth; // Obtiene el ancho del contenedor del slider

//         /**
//          * Función para chequear y ajustar la posición del slider si es necesario.
//          */
//         const checkPosition = () => {
//             // Si el scroll ha llegado al final, vuelve al inicio suavemente
//             if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - containerWidth) {
//                 scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
//             } 
//             // Si el scroll ha llegado al inicio, vuelve al final suavemente
//             else if (scrollContainer.scrollLeft <= 0) {
//                 scrollContainer.scrollTo({ left: scrollContainer.scrollWidth - containerWidth, behavior: 'smooth' });
//             }
//         };

//         /**
//          * Evento de desplazamiento con la rueda del mouse.
//          * @param {Event} event - El evento de desplazamiento.
//          */
//         const handleWheelScroll = (event) => {
//             event.preventDefault(); // Previene el comportamiento por defecto del scroll
//             scrollContainer.scrollBy({ left: event.deltaY, behavior: 'smooth' }); // Desplaza el contenido suavemente
//             checkPosition(); // Chequea y ajusta la posición si es necesario
//         };

//         /**
//          * Evento para el botón siguiente.
//          */
//         const handleNextClick = () => {
//             scrollContainer.scrollBy({ left: containerWidth / 2, behavior: 'smooth' }); // Desplaza el contenido a la derecha suavemente
//             setTimeout(checkPosition, 300); // Chequea y ajusta la posición después de un tiempo
//         };

//         /**
//          * Evento para el botón anterior.
//          */
//         const handlePrevClick = () => {
//             scrollContainer.scrollBy({ left: -containerWidth / 2, behavior: 'smooth' }); // Desplaza el contenido a la izquierda suavemente
//             setTimeout(checkPosition, 300); // Chequea y ajusta la posición después de un tiempo
//         };

//         // Inicializa la posición del scroll al inicio
//         scrollContainer.scrollLeft = 0;

//         // Asigna los eventos correspondientes
//         scrollContainer.addEventListener("wheel", handleWheelScroll);
//         nextBtn.addEventListener("click", handleNextClick);
//         prevBtn.addEventListener("click", handlePrevClick);
//     } else {
//         console.error("No se encontraron los elementos del slider."); // Muestra un error si los elementos no fueron encontrados
//     }
// }

// slider.js


// slider.js

/**
 * Función para inicializar el slider.
 */
export function initSlider() {
    const scrollContainer = document.querySelector(".sliderGallery");
    const prevBtn = document.getElementById("idBtnPrev");
    const nextBtn = document.getElementById("idBtnNex");

    if (scrollContainer && prevBtn && nextBtn) {
        const containerWidth = scrollContainer.offsetWidth;

        // Duplicar el contenido del carrusel dinámicamente
        const duplicateContent = () => {
            const originalContent = scrollContainer.innerHTML;
            scrollContainer.innerHTML +=  originalContent; // Duplicar tres veces el contenido
        };

        // Inicializa la posición del scroll en la mitad del contenido duplicado
        const initializePosition = () => {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2; // Ajustar para la posición inicial
        };

        /**
         * Función para chequear y ajustar la posición del slider si es necesario.
         */
        const checkPosition = () => {
            const maxScrollLeft = scrollContainer.scrollWidth - containerWidth; // Ajustar para el contenido duplicado tres veces

            if (scrollContainer.scrollLeft >= maxScrollLeft) {

                scrollContainer.scrollLeft = (scrollContainer.scrollWidth / 2) - containerWidth;
                handleNextClick();
            } else if (scrollContainer.scrollLeft <= 0) {

                scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
                handlePrevClick();
            }
        };

        /**
         * Evento de desplazamiento con la rueda del mouse.
         * @param {Event} event - El evento de desplazamiento.
         */
        const handleWheelScroll = (event) => {
            event.preventDefault(); // Previene el comportamiento por defecto del scroll
            scrollContainer.scrollBy({ left: event.deltaY, behavior: 'smooth' }) - 10; // Desplaza el contenido suavemente
            setTimeout(checkPosition, 300); // Chequea y ajusta la posición después de un tiempo
        };

        /**
         * Evento para el botón siguiente.
         */
        const handleNextClick = () => {
            scrollContainer.scrollBy({ left: (containerWidth / 2) - 1, behavior: 'smooth' }); // Desplaza el contenido a la derecha suavemente
            setTimeout(checkPosition, 300); // Chequea y ajusta la posición después de un tiempo
        };

        /**
         * Evento para el botón anterior.
         */
        const handlePrevClick = () => {
            scrollContainer.scrollBy({ left: - (containerWidth / 2) - 1 , behavior: 'smooth' }); // Desplaza el contenido a la izquierda suavemente
            setTimeout(checkPosition, 300); // Chequea y ajusta la posición después de un tiempo
        };

        // Duplicar el contenido
        duplicateContent();

        // Inicializar la posición del scroll
        initializePosition();

        // Asignar los eventos correspondientes
        scrollContainer.addEventListener("wheel", handleWheelScroll);
        nextBtn.addEventListener("click", handleNextClick);
        prevBtn.addEventListener("click", handlePrevClick);
    } else {
        console.error("No se encontraron los elementos del slider."); // Muestra un error si los elementos no fueron encontrados
    }
}
