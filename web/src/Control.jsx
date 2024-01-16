import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/control.css"

export function Control() {
    const ws = new WebSocket('ws://localhost:8080');

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
    
    return(
        <div id="main">
            <form method="post">
                <div id="statusBase">Gate is: <span id="status">Closed</span></div>
                <button type="submit" id="openBtn" onClick={openGate}>Open</button>
            </form>
            <div id="logs"></div>
        </div>
    )
}
