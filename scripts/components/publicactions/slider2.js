export function initSlider() {
    const scrollContainer = document.querySelector(".sliderGallery");
    const prevBtn = document.getElementById("idBtnPrev");
    const nextBtn = document.getElementById("idBtnNex");
    const indicatorsContainer = document.querySelector(".indicators");
    const slides = document.querySelectorAll(".slideer");
    const velocidadSlide = 500;
    let indicatorNow = 0;

    if (scrollContainer && prevBtn && nextBtn) {
        const containerWidth = scrollContainer.offsetWidth;
    
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
        const updateIndicators = (direction) => {
            const totalIndicators = slides.length;
            let prev = indicatorNow;
            indicatorNow = (indicatorNow + direction + totalIndicators) % totalIndicators;
            pintIndicator(indicatorNow, prev);
        };
    
        // Evento de desplazamiento con la rueda del mouse.
        const handleWheelScroll = (event) => {
            event.preventDefault(); // Previene el comportamiento por defecto del scroll
            requestAnimationFrame(() => {
                scrollContainer.style.scrollBehavior = 'smooth'; // Reactiva el comportamiento suave
            });
            scrollContainer.scrollBy({ left: event.deltaY, behavior: 'smooth' }) - 10; // Desplaza el contenido suavemente
            setTimeout(checkPosition, 300); // Chequea y ajusta la posición después de un tiempo
        };
    
        // Evento para el botón siguiente.
        const handleNextClick = () => {
            scrollContainer.scrollBy({ left: (containerWidth ) - 1, behavior: 'smooth' }); // Desplaza el contenido a la derecha suavemente
            requestAnimationFrame(() => {
                scrollContainer.style.scrollBehavior = 'smooth'; // Reactiva el comportamiento suave
            });
            setTimeout(checkPosition, velocidadSlide); // Chequea y ajusta la posición después de un tiempo
            updateIndicators(1);
        };
    
        // Evento para el botón anterior.
        const handlePrevClick = () => {
            scrollContainer.scrollBy({ left: - (containerWidth ) - 1 , behavior: 'smooth' }); // Desplaza el contenido a la izquierda suavemente
            requestAnimationFrame(() => {
                scrollContainer.style.scrollBehavior = 'smooth'; // Reactiva el comportamiento suave
            });
            setTimeout(checkPosition, velocidadSlide); // Chequea y ajusta la posición después de un tiempo
            updateIndicators(-1);
        };
    
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