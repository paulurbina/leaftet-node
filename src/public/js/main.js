var map = L.map('map-template').setView([-12.1381268,-76.9863691], 16);

//Socket io
const socket = io.connect();

const tile = L.tileLayer('http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png');

//Geolocation
map.locate({enableHighAccuracy: true});
map.on('locationfound', e => {
    const coords = [e.latlng.lat, e.latlng.lng];
    const newMarker = L.marker(coords);
    newMarker.bindPopup('Tu estas aqui!');
    map.addLayer(newMarker);   
    socket.emit('userCoordinates', e.latlng);   
});

// Socket new User connected
socket.on('newUserCoordinates', (coords) => {
    console.log(coords);
    const userIcon = L.icon({
        iconUrl: '/img/icon.png',
        iconSize: [38,42]
    })
    const newUserMarker = L.marker([coords.lat, coords.lng], {
        icon: userIcon
    });
    newUserMarker.bindPopup('New User');
    map.addLayer(newUserMarker);
});

map.addLayer(tile);