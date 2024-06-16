// slider.js

export function initSlider() {
    const scrollContainer = document.querySelector(".sliderGallery");
    const prevBtn = document.getElementById("idBtnPrev");
    const nextBtn = document.getElementById("idBtnNex");
    const indicatorsContainer = document.querySelector(".indicators");
    const slides = document.querySelectorAll(".spanSlider");
    const indicatorFinal = slides.length / 2;
    let indicatorNow = 0;
    let next = 0;

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

        // Generar indicadores
        const createIndicators = () => {
            for (let i = 0; i < indicatorFinal; i++) {
                const indicator = document.createElement("div");
                indicator.classList.add("indicator");
                indicator.classList.add(`id-indicator-${i}`);
                if (i === 0) indicator.classList.add("active");
                indicatorsContainer.appendChild(indicator);
            }
        };

        const pintIndicator = (next, prev) => {
            console.log(next, prev);
            const indicatorOld = document.querySelector(`.id-indicator-${prev}`);
            const indicatorNew = document.querySelector(`.id-indicator-${next}`);
            indicatorNew.classList.add("active");
            indicatorOld.classList.remove("active");
        }

        // Actualizar indicadores
        const updateIndicators = (idIndicator) => {
            const prevIndicator = indicatorNow;
            indicatorNow += idIndicator;

            if (indicatorNow >= indicatorFinal) {
                indicatorNow = 0; // Reiniciar al primer indicador
            } else if (indicatorNow < 0) {
                indicatorNow = indicatorFinal - 1; // Ir al último indicador
            }

            pintIndicator(indicatorNow, prevIndicator);
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
            updateIndicators(1)
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

        // Crear indicadores
        createIndicators();

        // Asignar los eventos correspondientes
        // scrollContainer.addEventListener("wheel", handleWheelScroll);
        nextBtn.addEventListener("click", handleNextClick);
        prevBtn.addEventListener("click", handlePrevClick);
    } else {
        console.error("No se encontraron los elementos del slider."); // Muestra un error si los elementos no fueron encontrados
    }
}

