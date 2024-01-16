import React from 'react'
import ReactDOM from 'react-dom/client'

export function Header() {
    return(
        <header>
            <h1 id="headerContent">Gatekeeper | Control</h1>
            <div id="headerBar">
                <div id="headerWelcome">
                    <img src="https://s3-media0.fl.yelpcdn.com/bphoto/XSxE9wgxspioU3Nf61Qz7w/348s.jpg" id="logo" />
                    <div>
                        <h1>Hi, <span id="username">...</span> </h1>
                        <span id="forecast"></span>
                    </div>
                </div>
                <nav>
                    <menu>
                        <li><a href="register.html">Register</a></li>
                        <li><a href="login.html">Login</a></li>
                        <li><a href="index.html">Control</a></li>
                    </menu>
                </nav>
            </div>
        </header>
    )
}
