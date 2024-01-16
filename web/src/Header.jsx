import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Link } from "react-router-dom"
import "./styles/header.css"

export function Header() {
    const [forecast, setForecast] = useState('...');
    const [user, setUser] = useState('<User>');
    
    useEffect(() => {
        fetch('https://api.weather.gov/gridpoints/SLC/106,146/forecast')
            .then(response => response.json())
            .then(forecast => {
                var period = forecast.properties.periods[0];
                setForecast(`${period.temperature}${period.temperatureUnit} ${period.shortForecast}`);
            })
    }, [])

    useEffect(() => {
        fetch('/user')
            .then(response => response.json())
            .then(user => setUser(`${user.username}`));
    }, [])
    
    return(

        <header>
            <h1 id="headerContent">Gatekeeper | Control</h1>
            <div id="headerBar">
                <div id="headerWelcome">
                    <img src="https://s3-media0.fl.yelpcdn.com/bphoto/XSxE9wgxspioU3Nf61Qz7w/348s.jpg" id="logo" />
                    <div>
                        <h1>Hi, <span id="username">{ user }</span> </h1>
                        <span id="forecast">{ forecast }</span>
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
