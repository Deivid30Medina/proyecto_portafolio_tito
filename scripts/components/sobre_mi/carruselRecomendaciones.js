// slider.js

function initSlider() {
    const scrollContainer = document.querySelector(".recomendaciones-sliderGallery");
    const prevBtn = document.getElementById("idBtnPrevRecomendaciones");
    const nextBtn = document.getElementById("idBtnNexRecomendaciones");
    const indicatorsContainer = document.querySelector(".recomendaciones-indicators");
    const slides = document.querySelectorAll(".recomendaciones-slideer");
    const velocidadSlide = 300;
    let indicatorNow = 0;
    let autoSlideInterval;
    let cont = slides.length;
    const tiempoCambioAutomaticoSlider = 6000;

    if (scrollContainer && prevBtn && nextBtn) {
        const containerWidth = scrollContainer.offsetWidth ;

        // Inicializa la posición del scroll al inicio
        const initializePosition = () => {
            scrollContainer.scrollLeft = 0; // Ajustar para la posición inicial
        };

        // Función para chequear y ajustar la posición del slider si es necesario.
        const checkPosition = () => {
            const maxScrollLeft = scrollContainer.scrollWidth - containerWidth;

            if (scrollContainer.scrollLeft >= maxScrollLeft) {
                scrollContainer.scrollLeft = 0; // Vuelve al inicio
                requestAnimationFrame(() => {
                    scrollContainer.style.scrollBehavior = 'smooth'; // Reactiva el comportamiento suave
                });
            } else if (scrollContainer.scrollLeft <= 0) {
                scrollContainer.scrollLeft = maxScrollLeft; // Va al final
                requestAnimationFrame(() => {
                    scrollContainer.style.scrollBehavior = 'smooth'; // Reactiva el comportamiento suave
                });
            }
        };

        // Generar indicadores
        const createIndicators = () => {
            for (let i = 0; i < slides.length; i++) {
                const indicator = document.createElement("div");
                indicator.classList.add("recomendaciones-indicator");
                indicator.classList.add(`id-indicatorRecomendacion0-${i}`);
                if (i === 0) indicator.classList.add("active");
                indicatorsContainer.appendChild(indicator);
            }
        };

        const pintIndicator = (next, prev) => {
            const indicatorOld = document.querySelector(`.id-indicatorRecomendacion0-${prev}`);
            const indicatorNew = document.querySelector(`.id-indicatorRecomendacion0-${next}`);
            indicatorNew.classList.add("active");
            indicatorOld.classList.remove("active");
        }

        // Actualizar indicadores
        const updateIndicators = (direction) => {
            cont -= 1;
            if (cont <= 0) {
                clearInterval(autoSlideInterval);
            }
            const totalIndicators = slides.length ;
            let prev = indicatorNow;
            indicatorNow = (indicatorNow + direction + totalIndicators) % totalIndicators;
            pintIndicator(indicatorNow, prev);
        };

        // Evento de desplazamiento con la rueda del mouse.
        const handleWheelScroll = (event) => {
            event.preventDefault(); // Previene el comportamiento por defecto del scroll
            scrollContainer.scrollBy({ left: event.deltaY, behavior: 'smooth' }) - 10; // Desplaza el contenido suavemente
            setTimeout(checkPosition, 300); // Chequea y ajusta la posición después de un tiempo
        };

        // Evento para el botón siguiente.
        const handleNextClick = () => {
            requestAnimationFrame(() => {
                scrollContainer.style.scrollBehavior = 'smooth'; // Reactiva el comportamiento suave
            });
            scrollContainer.scrollBy({ left: containerWidth, behavior: 'smooth' }); // Desplaza el contenido a la derecha suavemente
            setTimeout(checkPosition, velocidadSlide); // Chequea y ajusta la posición después de un tiempo
            updateIndicators(1);
        };

        // Evento para el botón anterior.
        const handlePrevClick = () => {
            requestAnimationFrame(() => {
                scrollContainer.style.scrollBehavior = 'smooth'; // Reactiva el comportamiento suave
            });
            scrollContainer.scrollBy({ left: -containerWidth, behavior: 'smooth' }); // Desplaza el contenido a la izquierda suavemente
            setTimeout(checkPosition, velocidadSlide); // Chequea y ajusta la posición después de un tiempo
            updateIndicators(-1);
        };

        // Iniciar desplazamiento automático
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(handleNextClick, tiempoCambioAutomaticoSlider); // 2000ms = 2 segundos
        };

        // Reiniciar el desplazamiento automático
        const resetAutoSlide = () => {
            if(cont > 0){
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
        };

        // Detener el desplazamiento automático
        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };
        // Inicializar la posición del scroll
        initializePosition();

        // Crear indicadores
        createIndicators();

        // Asignar los eventos correspondientes
        // scrollContainer.addEventListener("wheel", handleWheelScroll);
        nextBtn.addEventListener("click", handleNextClick);
        prevBtn.addEventListener("click", handlePrevClick);


        // Iniciar el desplazamiento automático
        startAutoSlide();
    } else {
        console.error("No se encontraron los elementos del slider."); // Muestra un error si los elementos no fueron encontrados
    }
}

initSlider();