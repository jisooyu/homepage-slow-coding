import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewBlog from "./pages/NewBlog";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Edit from "./pages/Edit";

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/new-blog' element={<PrivateRoute />}>
            <Route path='/new-blog' element={<NewBlog />} />
          </Route>
          <Route path='/blogs' element={<PrivateRoute />}>
            <Route path='/blogs' element={<Blogs />} />
          </Route>
          <Route path='/blog/:blogid' element={<PrivateRoute />}>
            <Route path='/blog/:blogid' element={<Blog />} />
          </Route>
          <Route path='/edit-blog/:blogid' element={<PrivateRoute />}>
            <Route path='/edit-blog/:blogid' element={<Edit />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
