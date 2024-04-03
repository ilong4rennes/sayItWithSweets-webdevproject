document.getElementById('find-me').addEventListener('click', function() {
    const status = document.getElementById('status');
    const bakeryLat = 40.50583747622529;
    const bakeryLng = -78.38690023678137;

    function success(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const map = L.map('index-map').fitWorld();
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const userMarker = L.marker([userLat, userLng]).addTo(map)
            .bindPopup('Your location').openPopup();
        const bakeryMarker = L.marker([bakeryLat, bakeryLng]).addTo(map)
            .bindPopup('Bakery location').openPopup();

        const group = new L.featureGroup([userMarker, bakeryMarker]);
        map.fitBounds(group.getBounds().pad(0.5)); 

        const distance = calculateDistance(userLat, userLng, bakeryLat, bakeryLng);
        status.textContent = `Distance to the bakery: ${distance.toFixed(2)} kilometers.`;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});

function calculateDistance(lat1, lon1, lat2, lon2) {
    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    const earthRadiusKm = 6371;
    const dLat = degreesToRadians(lat2-lat1);
    const dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}
