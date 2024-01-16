const ws = new WebSocket('ws://localhost:8080');

// localStorage.setItem("__gate_open", "true");
// localStorage.setItem("__logs", "");

// function openGate() {
//     localStorage.setItem("__gate_open", "true");
//     var $el = document.getElementById("status");
//     $el.textContent="Open";
//     $el.style.color="green";
//     setTimeout(closeGate, 3000);
//     addLog("opened");
// }

// function closeGate() {
//     localStorage.setItem("__gate_open", "false");
//     var $el = document.getElementById("status");
//     $el.textContent="Closed";
//     $el.style.color="red";
//     addLog("closed");
// }

function openGate() {
    fetch('/open-gate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'username' })
    });
}

function addLog(data) {
    var date = new Date(data.timestamp).toLocaleString();
    var $el = document.createElement("div");
    $el.innerHTML = `${date} - ${data.user} ${data.action} gate`;
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

function validate() {
    fetch('/validate')
        .then(response => response.json())
        .then(status => console.log('Status: ', status));
}

function getUser() {
    fetch('/user')
        .then(response => response.json())
        .then(user => {
            var $el = document.getElementById("username");
            $el.innerHTML = `${user.username}`;
        });
}

ws.onopen = () => {
    console.log('Websocket open in Browser');
    ws.send('Testing Text');
}

ws.onmessage = (message) => {
    console.log('Message received: ', message.data);
    const data = JSON.parse(message.data);
    if (data.action === 'opened') {
        var $el = document.getElementById("status");
        $el.textContent = "Open";
        $el.style.color = "green";
    }
    else if (data.action === 'closed') {
        var $el = document.getElementById("status");
        $el.textContent = "Closed";
        $el.style.color = "red";
    }
    addLog(data);
}

getForecast();
getUser();
