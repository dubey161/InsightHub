import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import DashBoard from "./pages/DashBoard"
import Project from "./pages/Project"
import About from "./pages/About"
import Header from "./components/Header"
import FooterComp from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import PrivateAdminRoute from "./components/PrivateAdminRoute"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
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
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>

        <Route element={<PrivateAdminRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/projects' element={<Project />} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  )
}

export default App
