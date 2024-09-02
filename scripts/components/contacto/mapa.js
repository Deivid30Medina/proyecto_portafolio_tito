// Inicializa el mapa y establece su vista en un punto inicial y un nivel de zoom
let map = L.map('map').setView([4.65222, -74.07789], 13); // Coordenadas de Bogotá
// Añade la capa de OpenStreetMap al mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Añade un marcador en el mapa
L.marker([4.65222, -74.07789]).addTo(map)
    .bindPopup('<b>Bogotá</b><br><button onclick="alert(\'Hello from Bogotá!\')">Click me</button>')
    // .openPopup();
