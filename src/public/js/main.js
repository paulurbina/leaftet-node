var map = L.map('map-template').setView([51.505, -0.09], 13);

const socket = io.connect();

L.tileLayer('http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png').addTo(map);

map.locate({enableHighAccuracy: true});
map.on('locationfound', (e) => {
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker = L.marker(coords);
    marker.bindPopup('yo estoy aqui');
    map.addLayer(marker);
    socket.emit('userCoordinates', e.latlng);
});

// socket new User connected
socket.on('userCoordinates', (coords) => {
    const marker = L.marker(coords.lat, coords.lng).addTo(map);
    marker.bindPopup('Hello here').openPopup();
    map.addLayer(marker);
});
