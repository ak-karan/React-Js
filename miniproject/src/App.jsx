
import React from "react"
import Hearder from "./components/header/Hearder"
import Footer from "./components/footer/Footer"
import Home from "./pages/Home"
import { Link } from "react-router-dom"

function App() {

  return (
    <>
      <Link to="/user/123">Go to User 123</Link>
    </>
  )
}

export default App
