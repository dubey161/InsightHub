import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import DashBoard from "./pages/DashBoard"
import Project from "./pages/Project"
import About from "./pages/About"
import Header from "./components/Header"
function App() {

  return (
    <BrowserRouter>
      {/* as header is at all page */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/projects' element={<Project />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
