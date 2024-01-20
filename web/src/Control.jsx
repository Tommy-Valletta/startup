import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/control.css"

function toUpperCase(status) {
    return status.charAt(0).toUpperCase() + status.slice(1)
}

export function Control({ user, logs, status }) {

    function openGate() {
        fetch('/open-gate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: user.username })
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const upper = toUpperCase(status);
    return (
        <main className='control'>
            <div>
                <div id="statusBase">Gate is:
                    <span id="status" className={status}> {upper} </span>
                </div>
                <button type="submit" id="openBtn" className={status} onClick={openGate}>{upper}</button>
            </div>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>
                        <span>{new Date(log.timestamp).toLocaleString()} - </span>
                        <span>{log.user} </span>
                        <span>{log.action} gate</span>
                    </li>
                ))}
            </ul>
        </main>
    )
}
