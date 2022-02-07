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