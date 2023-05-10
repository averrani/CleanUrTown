var url = new URL("http://localhost:3001/api/incidents/all");

var map = L.map('map').setView([43.296482, 5.36978], 10);

var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

$.get(url, function (data) {
	data.incidents.forEach(function (incident) {
		var marker = L.marker([incident.longitude, incident.latitude]).addTo(map);
		marker.bindPopup("<b>" + incident.type + "</b><br>" + incident.situation).openPopup();
	});
});


OpenStreetMap_Mapnik.addTo(map);
