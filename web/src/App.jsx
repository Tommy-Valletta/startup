import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"
import { Header } from "./Header"
import { Control } from "./Control"
import { Login } from "./Login"
import { Register } from "./Register"
import { NotFound } from "./NotFound"
import { Footer } from "./Footer"
import "./styles/app.css"

function App() {
  const [user, setUser] = useState(null);
  const [forecast, setForecast] = useState('...');
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('closed');
  const navigate = useNavigate();

  const connection = useRef(null);

  function addLog(log) {
    setLogs(logs => [...logs, log]);
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    // When the websocket is open, this function is called
    ws.addEventListener("open", (event) => {
      console.log('Websocket open in Browser', event);
      ws.send("Connection established");
    });

    // When the websocket receives a message, this function is called
    ws.addEventListener("message", (message) => {
      console.log('Message received: ', message.data);
      const data = JSON.parse(message.data);
      if (data.action === 'opened') {
        setStatus('opened');
      }
      else if (data.action === 'closed') {
        setStatus('closed');
      }
      addLog(data);
    });

    connection.current = ws

    return () => connection.close();
  }, [setLogs, setStatus])

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/user");
      const user = await response.json();
      return user;
    }

    fetchUser()
      .then((user) => {
        if (user.username) {
          setUser(user);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    fetch('https://api.weather.gov/gridpoints/SLC/106,146/forecast')
      .then(response => response.json())
      .then(forecast => {
        var period = forecast.properties.periods[0];
        setForecast(`${period.temperature}${period.temperatureUnit} ${period.shortForecast}`);
      })
  }, [])

  return (
    <>
      <Header user={user} forecast={forecast} />
      <Routes>
        <Route index element={<Control user={user} logs={logs} status={status} />} />
        <Route path="/control" element={<Control user={user} logs={logs} status={status} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
