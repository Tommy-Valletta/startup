import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/auth.css"

export function Login() {
    return(
        <main>
            <form action="login" method="post">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required></input>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required></input>

                <button type="submit">Login</button>
                <a class="register" href="register.html">Register</a>
            </form>
        </main>
    )
}
