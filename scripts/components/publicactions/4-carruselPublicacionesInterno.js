let slider = null;
let scrollPosition = 0;

document.addEventListener("DOMContentLoaded", function () {
  const firstCarouselImages = document.querySelectorAll(
    "#idSliderGallery1 .PublicacionCarrusel_slider_img"
  );
  firstCarouselImages.forEach((image) => {
    image.addEventListener("click", function () {
      const family = this.getAttribute("data-family");
      showSecondCarousel(family);
    });
  });
});


function cerrarCarrusel(secondaryContainer,slides) {
  const closeBtn = document.getElementById("idCLoseCarrusel");
  closeBtn.addEventListener("click", () => {
    eliminarIndicators(slides);
    seeNextAndPrev();
    addScrollBody();
    if (slider !== null) {
      slider.dispose();
      slider = null;
    }
    secondaryContainer.style.display = "none";
  });
}

function seeNextAndPrev() {
  const spanOcultar = document.getElementById("idSpanOcultar");
  spanOcultar.style.display = "none";
  spanOcultar.classList.remove("idSpanOcultar");

  const nextDos = document.getElementById("idBtnNex2");
  nextDos.style.opacity = 1;

  const prevDos = document.getElementById("idBtnPrev2");
  prevDos.style.opacity = 1;
}

function handleNextAndPrev() {
  const spanOcultar = document.getElementById("idSpanOcultar");
  spanOcultar.style.display = "block";
  spanOcultar.classList.add("idSpanOcultar");

  const nextDos = document.getElementById("idBtnNex2");
  nextDos.style.opacity = 0.2;

  const prevDos = document.getElementById("idBtnPrev2");
  prevDos.style.opacity = 0.2;
}

function centrarSection(){
  // Center the screen on the section with the specified ID
  const section = document.getElementById("idCarruselImagenesPublicacion");

  //Obtiene la posición vertical absoluta de un elemento en la página.
  // Esto es útil para realizar desplazamientos precisos o para alinear otros elementos en función de la ubicación
  const topPosition = section.getBoundingClientRect().top + window.scrollY;
            
  // Desplazar la vista a la posición calculada
  window.scrollTo({ top: topPosition - 60, behavior: 'smooth' });

  setTimeout(() => {
    removeScroll();
  }, "1000");


}

function removeScroll() {
  // Guardar la posición actual del scroll
  scrollPosition = window.scrollY;
  console.log(scrollPosition);

  let body = document.getElementById("idBody");
  
  // Fijar el body en su posición actual
  body.style.position = 'fixed';
  body.style.top = `-${scrollPosition}px`;
}

function addScrollBody(){

  const section = document.getElementById("idCarruselImagenesPublicacion");

  const body = document.body;

  body.style.position = '';
  body.style.top = '';

  const topPosition = section.getBoundingClientRect().top + window.scrollY;
            
  // Desplazar la vista a la posición calculada
  window.scrollTo({ top: topPosition - 60, behavior: 'smooth' });
  
}

function showSecondCarousel(family) {
  const secondaryCarousels = document.querySelectorAll(
    ".PublicacionCarrusel_containerSecundario_container_family"
  );
  secondaryCarousels.forEach((carousel) => {
    carousel.style.display = "none";
  });

  const selectedCarousel = document.querySelector(
    `.PublicacionCarrusel_containerSecundario_container_family[data-family="${family}"]`
  );
  if (selectedCarousel) {
    selectedCarousel.style.display = "block";
  }

  const secondaryContainer = document.getElementById(
    "idSliderGallerySecundario"
  );
  secondaryContainer.style.display = "block";

  handleNextAndPrev();

  const scrollContainer = selectedCarousel.querySelector(
    ".PublicacionCarrusel_containerSecundario_slideer"
  );
  const slides = selectedCarousel.querySelectorAll(
    ".PublicacionCarrusel_containerSecundario_slideer_item"
  );

  if (slider !== null) {
    slider.dispose();
  }

  centrarSection();

  createIndicators(slides);

  slider = new Slider(scrollContainer, slides);
  cerrarCarrusel(secondaryContainer,slides);
}

function createIndicators(sliders) {
  sliders.forEach((slide, index) => {
    // Crea el contenedor de indicadores
    const indicatorsContainer = document.createElement("div");
    indicatorsContainer.className =
      "PublicacionCarrusel_containerSecundario_indicators";

    // Añade los indicadores al contenedor
    for (let i = 0; i < sliders.length; i++) {
      const indicator = document.createElement("div");
      indicator.className = `indicator4 id-indicator4-${i}`;
      if (i === index) {
        indicator.classList.add("active");
      }
      indicatorsContainer.appendChild(indicator);
    }

    // Añade el contenedor de indicadores al slide
    const span = slide.querySelector(
      ".PublicacionCarrusel_containerSecundario_slider_span"
    );
    span.appendChild(indicatorsContainer);
  });
}

function eliminarIndicators(sliders) {
  sliders.forEach((slide) => {
    // Selecciona el contenedor de indicadores dentro del slide
    const indicatorsContainer = slide.querySelector(
      ".PublicacionCarrusel_containerSecundario_indicators"
    );

    // Si existe el contenedor de indicadores, lo elimina
    if (indicatorsContainer) {
      indicatorsContainer.remove();
    }
  });
}

class Slider {
  constructor(scrollContainer, slides) {
    this.scrollContainer = scrollContainer;
    this.slides = slides;
    this.intervalId = null;
    this.indicatorNow = 0;
    this.velocidadSlide = 300;
    this.tiempoCambioAutomaticoSlider = 6000;

    this.prevBtn = document.getElementById("idBtnPrev4");
    this.nextBtn = document.getElementById("idBtnNex4");


    this.initializeSlider();
  }

  initializeSlider() {
    const containerWidth = this.scrollContainer.offsetWidth;

    this.scrollContainer.scrollLeft = 0;
    // this.updateIndicators(0);

    this.prevBtn.addEventListener("click", this.handlePrevClick.bind(this));
    this.nextBtn.addEventListener("click", this.handleNextClick.bind(this));
  }

  updateIndicators(direction) {
    const totalIndicators = this.slides.length;
    let prev = this.indicatorNow;
    this.indicatorNow =
      (this.indicatorNow + direction + totalIndicators) % totalIndicators;
    this.pintIndicator(this.indicatorNow, prev);
  }

  pintIndicator(next, prev) {
    console.log(next, prev);
    const indicatorOld = document.querySelector(`.id-indicator4-${prev}`);
    const indicatorNew = document.querySelector(`.id-indicator4-${next}`);
    if (indicatorNew) indicatorNew.classList.add("active");
    if (indicatorOld) indicatorOld.classList.remove("active");
  }

  handleNextClick() {
    const containerWidth = this.scrollContainer.offsetWidth;
    this.scrollContainer.scrollBy({ left: containerWidth, behavior: "smooth" });
    setTimeout(this.checkPosition.bind(this), this.velocidadSlide);
    // this.updateIndicators(1);
  }

  handlePrevClick() {
    const containerWidth = this.scrollContainer.offsetWidth;
    this.scrollContainer.scrollBy({
      left: -containerWidth,
      behavior: "smooth",
    });
    setTimeout(this.checkPosition.bind(this), this.velocidadSlide);
    // this.updateIndicators(-1);
  }

  checkPosition() {
    const containerWidth = this.scrollContainer.offsetWidth;
    const maxScrollLeft = this.scrollContainer.scrollWidth - containerWidth;

    if (this.scrollContainer.scrollLeft >= maxScrollLeft) {
      this.scrollContainer.scrollLeft = 0;
    } else if (this.scrollContainer.scrollLeft <= 0) {
      this.scrollContainer.scrollLeft = maxScrollLeft;
    }
  }

  stopAutoSlide() {
    clearInterval(this.intervalId);
  }

  dispose() {
    this.stopAutoSlide();
    this.prevBtn.removeEventListener("click", this.handlePrevClick.bind(this));
    this.nextBtn.removeEventListener("click", this.handleNextClick.bind(this));
    this.scrollContainer.scrollLeft = 0;
    this.indicatorNow = 0;
  }
}
