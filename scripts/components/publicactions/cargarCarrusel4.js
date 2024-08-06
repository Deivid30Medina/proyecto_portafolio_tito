document.addEventListener('DOMContentLoaded', function () {
    const firstCarouselImages = document.querySelectorAll('#idSliderGallery1 .PublicacionCarrusel_slider_img');
  
    firstCarouselImages.forEach(image => {
      image.addEventListener('click', function () {
        const family = this.getAttribute('data-family');
        showSecondCarousel(family);
      });
    });
  
    document.getElementById('idCLoseCarrusel').addEventListener('click', function () {
      const script = document.getElementById('carouselScript');
      if (script) {
        document.body.removeChild(script);
      }
  
      document.getElementById('carouselContainer').style.display = 'none';
  
      if (slider !== null) {
        slider.dispose();
        slider = null;
      }
    });
  });
  
  function showSecondCarousel(family) {
    const script = document.createElement('script');
    script.src = '../../scripts/components/publicactions/4-carruselPublicacionesInterno.js?v=1.0';
    script.id = 'carouselScript';
    script.defer = true;
  
    script.onload = function () {
      initSlider(family); // Asegúrate de que initSlider acepte el parámetro family
    };
  
    document.body.appendChild(script);
    document.getElementById('carouselContainer').style.display = 'block';
  }
  