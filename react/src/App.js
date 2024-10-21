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

const App = () => {
  const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/blogs", {
  //         credentials: "include",
  //       });
  //       const data = await response.json();
  //       setBlogs(data);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   };
  //   fetchBlogs();
  // }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://blogging-platform-1-rp5u.onrender.com/api/blogs",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const addBlog = (newBlog) => {
    setBlogs((prevList) => [...prevList, newBlog]);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  const handleUpdate = (updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      )
    );
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              <Achievements />
              <Why />
              <Explore />
              <ItemList itemList={blogs} />
            </>
          }
        />
        <Route
          path="/BlogPage"
          element={<BlogPage onDelete={handleDelete} blogs={blogs} />}
        />
        <Route
          path="/create-post"
          element={<CreateBlog onAddBlog={addBlog} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/edit-post"
          element={<EditBlog onUpdate={handleUpdate} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
