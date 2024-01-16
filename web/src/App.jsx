import { Route, Routes } from "react-router-dom"
import { Header } from "./Header"
import { Control } from "./Control"
import { Login } from "./Login"
import { Register } from "./Register"
import { Footer } from "./Footer"
import "./styles/app.css"

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Control />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
