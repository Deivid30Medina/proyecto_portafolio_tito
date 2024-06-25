
export function loadDataSliderPublicaciones() {
    return fetch('./data/publicaciones/publicaciones-data.json')
        .then(response => response.json())
        .then(data => {
            const sliderGallery = document.getElementById('idSliderGallery');
            sliderGallery.innerHTML = ''; // Limpiar cualquier contenido existente

            const chunks = chunkArray(data.data, 4);

            chunks.forEach(chunk => {
                const divElement = document.createElement('div');
                divElement.classList.add('slideer', 'full-height');

                chunk.forEach(item => {
                    const spanElement = document.createElement('span');
                    spanElement.classList.add('spanSlider', 'flex-center');

                    const imgPrincipal = document.createElement('img');
                    imgPrincipal.src = item.imagen_principal;
                    imgPrincipal.alt = item.etiqueta;
                    imgPrincipal.classList.add('sliderImg');

                    const imgSecundaria = document.createElement('img');
                    imgSecundaria.src = item.imagen_secundaria;
                    imgSecundaria.alt = item.etiqueta;
                    imgSecundaria.classList.add('efectoCardPubl');

                    const etiqueta = document.createElement('p');
                    etiqueta.textContent = item.etiqueta;
                    etiqueta.classList.add('etiqueta');

                    spanElement.appendChild(imgPrincipal);
                    spanElement.appendChild(etiqueta);
                    spanElement.appendChild(imgSecundaria);

                    divElement.appendChild(spanElement);
                });

                sliderGallery.appendChild(divElement);
            });
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
}

function chunkArray(array, chunkSize) {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        results.push(array.slice(i, i + chunkSize));
    }
    return results;
}

