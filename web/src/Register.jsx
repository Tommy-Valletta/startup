import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/reg.css"

export function Register() {
    return(
        <main>
            <form action="register" method="post">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required></input>

                <label for="gatecode">Gate Code:</label>
                <input type="gatecode" id="gatecode" name="gatecode" required></input>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required></input>

                <label for="confirm_password">Confirm Password:</label>
                <input type="password" id="confirm_password" name="confirm_password" required></input>

                <button type="submit">Register</button>
            </form>
        </main>
    )
}
