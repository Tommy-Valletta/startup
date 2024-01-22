import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import "./styles/auth.css"

export function Login({ setUser }) {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function doLogin() {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(user => {
                setUser(user)
                navigate('/Control')
            }) 
            .catch(err => {
                alert('Invalid username or password');
            })
    }

    return (
        <main className='login'>
            <div>
                <label for="username">Username:</label>
                <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" required></input>

                <label for="password">Password:</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required></input>

                <button type="submit" onClick={doLogin}>Login</button>
                <a class="register" href="register.html">Register</a>
            </div>
        </main>
    )
}
