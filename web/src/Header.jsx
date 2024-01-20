import React from 'react'
import { Link } from "react-router-dom"
import "./styles/header.css"

export const Header = ({ user, forecast }) => {
    return (
        <header>
            <h1 id="headerContent">Gatekeeper | Control</h1>
            <div id="headerBar">
                <div id="headerWelcome">
                    <img src="https://s3-media0.fl.yelpcdn.com/bphoto/XSxE9wgxspioU3Nf61Qz7w/348s.jpg" id="logo" />
                    <div>
                        <h1>Hi, <span id="username">{(user) ? user.username : "you're not logged in"}</span> </h1>
                        <span id="forecast">{forecast}</span>
                    </div>
                </div>
                <nav>
                    <menu>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/">Control</Link></li>
                    </menu>
                </nav>
            </div>
        </header>
    )
}
