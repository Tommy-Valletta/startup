import React from 'react'
import ReactDOM from 'react-dom/client'

export function Control() {
    return(
        <div id="main">
            <form action="javascript:openGate()" method="post">
                <div id="statusBase">Gate is: <span id="status">Closed</span></div>

                <button type="submit" id="openBtn">Open</button>
            </form>
            <div id="logs"></div>
        </div>
    )
}
