var map = L.map('map').setView([43.296482, 5.36978], 10);

var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// var marker = L.marker([51.5, -0.09]).addTo(map);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

OpenStreetMap_Mapnik.addTo(map);
