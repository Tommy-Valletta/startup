import { Route, Routes } from "react-router-dom"
import { Header } from "./Header"
import { Control } from "./Control"
import { Login } from "./Login"
import { Register } from "./Register"
import { Footer } from "./Footer"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Control />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
