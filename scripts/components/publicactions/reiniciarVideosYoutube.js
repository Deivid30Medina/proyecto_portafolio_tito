/**
 * Esta función es llamada automáticamente por la API de YouTube una vez que está lista.
 * Se encarga de inicializar los reproductores de YouTube para cada iframe en la página.
 */
function onYouTubeIframeAPIReady() {
    let players = [];
    // Selecciona todos los iframes con la clase 'PublicacionCarruselYoutube_slideer_video' y los recorre
    document.querySelectorAll('.PublicacionCarruselYoutube_slideer_video').forEach((iframe, index) => {
        // Crea un nuevo reproductor de YouTube para cada iframe y lo agrega al array 'players'
        players[index] = new YT.Player(iframe.id, {
            events: {
                // Asocia la función 'onPlayerStateChange' al evento 'onStateChange' del reproductor
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

/**
 * Esta función se llama cada vez que cambia el estado de un reproductor de YouTube.
 * @param {Object} event - El evento que contiene información sobre el estado del reproductor.
 */
function onPlayerStateChange(event) {
    // Comprueba si el estado del reproductor es 'ENDED', que indica que el video ha terminado
    if (event.data === YT.PlayerState.ENDED) {
        // Obtiene el iframe que contiene el video que terminó
        const iframe = event.target.getIframe();
        // Reinicia el video para mostrar la miniatura
        iframe.src = iframe.src; 
    }
}

// Comprueba si la API de YouTube ya está cargada y, de ser así, llama a la función de inicialización
if (typeof YT !== 'undefined' && YT && YT.Player) {
    onYouTubeIframeAPIReady();
}
