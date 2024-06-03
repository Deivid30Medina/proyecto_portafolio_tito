// videoControl.js
export function initVideo() {
    const video = document.getElementById('idHomeVideo');

    if (video) {
        video.oncanplay = function() {
            video.play();
        };
    } else {
        console.error('No se encontró el elemento del video con id "idHomeVideo".');
    }
}
