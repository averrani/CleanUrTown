var map = L.map('map').setView([43.296482, 5.36978], 10);

1 : 43.352902, 5.285431
2 : 43.358366219149865, 5.556944074087913
3 : 43.213288, 5.284260
4 : 43.216087, 5.571010




var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var marker = L.marker([43.296482, 5.36978]).addTo(map);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

OpenStreetMap_Mapnik.addTo(map);
