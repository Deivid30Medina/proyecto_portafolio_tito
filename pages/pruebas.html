let slider = null;

document.addEventListener('DOMContentLoaded', function () {
  const firstCarouselImages = document.querySelectorAll('#idSliderGallery1 .PublicacionCarrusel_slider_img');

  firstCarouselImages.forEach(image => {
    image.addEventListener('click', function () {
      const family = this.getAttribute('data-family');
      showSecondCarousel(family);
    });
  });
});

function cerrarCarrusel(secondaryContainer) {
  const closeBtn = document.getElementById("idCLoseCarrusel");
  closeBtn.addEventListener("click", () => {
    deleteIndicator();
    seeNextAndPrev();
    if (slider !== null) {
      slider.dispose();
      slider = null;
    }
    secondaryContainer.style.display = 'none';
  });
}

function seeNextAndPrev(){
  const spanOcultar = document.getElementById('idSpanOcultar');
  spanOcultar.style.display = 'none';

  const nextDos = document.getElementById('idBtnNex2');
  nextDos.style.opacity = 1;

  const prevDos = document.getElementById('idBtnPrev2');
  prevDos.style.opacity = 1;
}

function handleNextAndPrev(){
  const spanOcultar = document.getElementById('idSpanOcultar');
  spanOcultar.style.display = 'block';

  const nextDos = document.getElementById('idBtnNex2');
  nextDos.style.opacity = 0.5;

  const prevDos = document.getElementById('idBtnPrev2');
  prevDos.style.opacity = 0.5;
}


function deleteIndicator() {
  const indicatorContainer = document.querySelector('.PublicacionCarrusel_containerSecundario_indicators');
  const indicatorsItem = document.querySelectorAll('.indicator4');
  indicatorsItem.forEach((item) => {
    item.classList.remove("active");
    indicatorContainer.removeChild(item);
  });
  
}

function showSecondCarousel(family) {
  const secondaryCarousels = document.querySelectorAll('.PublicacionCarrusel_containerSecundario_container_family');
  secondaryCarousels.forEach(carousel => {
    carousel.style.display = 'none';
  });

  const selectedCarousel = document.querySelector(`.PublicacionCarrusel_containerSecundario_container_family[data-family="${family}"]`);
  if (selectedCarousel) {
    selectedCarousel.style.display = 'block';
  }

  const secondaryContainer = document.getElementById('idSliderGallerySecundario');
  secondaryContainer.style.display = 'block';

  handleNextAndPrev();

  const scrollContainer = selectedCarousel.querySelector('.PublicacionCarrusel_containerSecundario_slideer');
  const slides = selectedCarousel.querySelectorAll('.PublicacionCarrusel_containerSecundario_slideer_item');

  if (slider !== null) {
    slider.dispose();
  }

  slider = new Slider(scrollContainer, slides);
  cerrarCarrusel(secondaryContainer);
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
    this.indicatorsContainer = document.querySelector(".PublicacionCarrusel_containerSecundario_indicators");

    this.initializeSlider();
  }

  initializeSlider() {
    const containerWidth = this.scrollContainer.offsetWidth;

    this.scrollContainer.scrollLeft = 0;

    this.createIndicators();
    this.updateIndicators(0);

    this.prevBtn.addEventListener("click", this.handlePrevClick.bind(this));
    this.nextBtn.addEventListener("click", this.handleNextClick.bind(this));

  }

  createIndicators() {
    this.indicatorsContainer.innerHTML = '';
    this.slides.forEach((slide, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator4");
      indicator.classList.add(`id-indicator4-${index}`);
      if (index === 0) indicator.classList.add("active");
      this.indicatorsContainer.appendChild(indicator);
    });
  }

  updateIndicators(direction) {
    const totalIndicators = this.slides.length;
    let prev = this.indicatorNow;
    this.indicatorNow = (this.indicatorNow + direction + totalIndicators) % totalIndicators;
    this.pintIndicator(this.indicatorNow, prev);
  }

  pintIndicator(next, prev) {
    console.log(next,prev);
    const indicatorOld = document.querySelector(`.id-indicator4-${prev}`);
    const indicatorNew = document.querySelector(`.id-indicator4-${next}`);
    if (indicatorNew) indicatorNew.classList.add("active");
    if (indicatorOld) indicatorOld.classList.remove("active");
  }

  handleNextClick() {
    const containerWidth = this.scrollContainer.offsetWidth;
    this.scrollContainer.scrollBy({ left: containerWidth, behavior: 'smooth' });
    setTimeout(this.checkPosition.bind(this), this.velocidadSlide);
    this.updateIndicators(1);
  }

  handlePrevClick() {
    const containerWidth = this.scrollContainer.offsetWidth;
    this.scrollContainer.scrollBy({ left: -containerWidth, behavior: 'smooth' });
    setTimeout(this.checkPosition.bind(this), this.velocidadSlide);
    this.updateIndicators(-1);
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
    this.indicatorsContainer.innerHTML = '';
    this.scrollContainer.scrollLeft = 0;
    this.indicatorNow = 0;
  }
}
