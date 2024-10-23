import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "./components/Main";
import Achievements from "./components/Achievements";
import Why from "./components/Why";
import Explore from "./components/Explore";
import BlogPage from "./components/BlogPage";
import ItemList from "./components/ItemList";
import CreateBlog from "./components/CreateBlog";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EditBlog from "./components/EditBlog";
import NavbarHome from "./components/NavbarHome";
import MainHome from "./components/MainHome";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchBlogs = async () => {
    // const response = await fetch("http://localhost:5000/api/blogs");
    const response = await fetch(
      "https://blogging-platform-1-rp5u.onrender.com/api/blogs"
    );
    const data = await response.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, [refresh]);

  const addBlog = (newBlog) => {
    setBlogs((prevList) => [...prevList, newBlog]);
    setRefresh((prev) => !prev);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog._id !== id));
    setRefresh((prev) => !prev);
  };

  const handleUpdate = (updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      )
    );
    setRefresh((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Main />
              <Achievements />
              <Why />
            </>
          }
        />
        <Route
          path="/homepage"
          element={
            <>
              <NavbarHome />
              <MainHome />
              <Explore />
              <ItemList itemList={blogs} />
            </>
          }
        />
        <Route
          path="/BlogPage"
          element={
            <>
              <NavbarHome />
              <BlogPage onDelete={handleDelete} blogs={blogs} />
            </>
          }
        />
        <Route
          path="/create-post"
          element={<CreateBlog onAddBlog={addBlog} />}
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <Signup />
            </>
          }
        />
        <Route
          path="/edit-post"
          element={<EditBlog onUpdate={handleUpdate} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
