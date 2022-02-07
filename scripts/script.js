const form = qs("#form");
const input = qs("#input");

function qs(queryString) {
    return document.querySelector(queryString);
}

async function handleSubmit(e) {
    e.preventDefault();
    isNaN(input.value);
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${config.apiKey}&${isNaN(input.value) ? "domain" : "ipAddress"}=${input.value}`).then(r => r.json());
    const {ip, location, isp} = res;
    insertDataOnPage(ip, location, isp);
    getLatLngFromIp(ip).then(latlng => buildMap(...latlng));
}

function insertDataOnPage(ip, location, isp) {
    qs("#ip").innerText = ip;
    qs("#isp").innerText = isp;
    qs("#timezone").innerText = `UTC ${location.timezone}`;
    qs("#location").innerText = `${location.city}, ${location.region} - ${location.country}`;

}

form.addEventListener("submit", handleSubmit);