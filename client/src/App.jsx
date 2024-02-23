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
import PostPage from "./pages/PostPage"
import ScrollToTp from './components/ScrollToTp';
import Search from "./pages/Search";
import Paymentsuccess from "./pages/paymentsuccess";
import BookPage from "./pages/BookPage";
import ShowBooks from "./components/ShowBooks"
import Cart from "./components/Cart"
import Paymentfailure from "./pages/paymentfailure"
function App() {

  return (
    <BrowserRouter>
      <ScrollToTp />
      {/* as header is at all page */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route path="/InSightHub-Books" element={<ShowBooks />} />
        <Route path='/book/:bookSlug' element={<BookPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>

        <Route element={<PrivateAdminRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path='/projects' element={<Project />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path='/paymentsuccess' element={<Paymentsuccess />} />
        <Route path='/paymentfailure' element={<Paymentfailure />} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  )
}

export default App
