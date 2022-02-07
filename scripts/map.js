async function getUserIp() {
    const { ip } = await fetch("https://api.ipify.org/?format=json").then(r => r.json());
    return ip;
}

async function getLatLngFromIp(ipAddress) {
    const { ip, location, isp } = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${config.apiKey}&ipAddress=${ipAddress}`).then(r => r.json());
    insertDataOnPage(ip, location, isp);
    console.log("LOCATION", location);
    return [location.lat, location.lng];
}

function buildMap(lat, lon) {
    document.getElementById('map-container').innerHTML = "<div id='map' class='map' ></div>";

    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' + ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    });

    var map = new L.Map('map');
    map.setView(new L.LatLng(lat, lon), 14);
    map.addLayer(layer);
}

// build map
getUserIp().then((ip) => {
    return getLatLngFromIp(ip);
}).then(latlng => buildMap(...latlng));