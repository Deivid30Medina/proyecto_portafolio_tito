// slider.js

// Función para inicializar el slider
export function initSlider() {
    const scrollContainer = document.querySelector(".sliderGallery");
    const prevBtn = document.getElementById("idBtnPrev");
    const nextBtn = document.getElementById("idBtnNex");

    if (scrollContainer && prevBtn && nextBtn) {
        // Duplicar el contenido para crear el efecto infinito
        const slides = Array.from(scrollContainer.children);
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            scrollContainer.appendChild(clone);
        });

        const containerWidth = scrollContainer.offsetWidth;

        // Chequear la posición del slider y ajustar si es necesario
        const checkPosition = () => {
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - containerWidth) {
                // scrollContainer.style.scrollBehavior = "auto";
                scrollContainer.scrollLeft = scrollContainer.scrollLeft - scrollContainer.scrollWidth / 2;
                scrollContainer.style.scrollBehavior = "smooth";
                // scrollContainer.scrollLeft += containerWidth; // Simula un segundo clic
            } else if (scrollContainer.scrollLeft <= 0) {
                // scrollContainer.style.scrollBehavior = "auto";
                scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2 + scrollContainer.scrollLeft;
                scrollContainer.style.scrollBehavior = "smooth";
                // scrollContainer.scrollLeft -= containerWidth; // Simula un segundo clic
            }
        };

        // Evento de desplazamiento con la rueda del mouse
        const handleWheelScroll = (event) => {
            event.preventDefault();
            scrollContainer.style.scrollBehavior = "auto";
            scrollContainer.scrollLeft += event.deltaY;
            checkPosition();
        };

        // Evento para el botón siguiente
        const handleNextClick = () => {
            scrollContainer.style.scrollBehavior = "smooth";
            scrollContainer.scrollLeft += containerWidth / 2; // Mover según el ancho del contenedor
            setTimeout(() => {
                checkPosition();
            }, 1000); // Ajusta el tiempo según la duración de la transición
        };

        // Evento para el botón anterior
        const handlePrevClick = () => {
            scrollContainer.style.scrollBehavior = "smooth";
            scrollContainer.scrollLeft -= containerWidth / 2; // Mover según el ancho del contenedor
            setTimeout(() => {
                checkPosition();
            }, 1000); // Ajusta el tiempo según la duración de la transición
        };

        // Inicializar la posición del scroll
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;

        // Asignar eventos
        scrollContainer.addEventListener("wheel", handleWheelScroll);
        nextBtn.addEventListener("click", handleNextClick);
        prevBtn.addEventListener("click", handlePrevClick);
    } else {
        console.error("No se encontraron los elementos del slider.");
    }
}
