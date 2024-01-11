localStorage.setItem("__gate_open", "true");
localStorage.setItem("__logs", "");

function openGate() {
    localStorage.setItem("__gate_open", "true");
    var $el = document.getElementById("status");
    $el.textContent="Open";
    $el.style.color="green";
    setTimeout(closeGate, 3000);
    addLog("opened");
}

function closeGate() {
    localStorage.setItem("__gate_open", "false");
    var $el = document.getElementById("status");
    $el.textContent="Closed";
    $el.style.color="red";
    addLog("closed");
}

function addLog(action) {
    var date = new Date().toLocaleString();
    var $el = document.createElement("div");
    $el.innerHTML = `${date} - user ${action} gate`;
    document.getElementById("logs").prepend($el);
}

function getForecast() {
    fetch('https://api.weather.gov/gridpoints/SLC/106,146/forecast')
    .then(response => response.json())
    .then(forecast => {
        var period = forecast.properties.periods[0];
        var $el = document.getElementById("forecast");
        $el.innerHTML = `${period.temperature}${period.temperatureUnit} ${period.shortForecast}`;
    })
}

getForecast();
