import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Achievements from "./components/Achievements";
import Why from "./components/Why";
import Explore from "./components/Explore";
import BlogPage from "./components/BlogPage";
import ItemList from "./components/ItemList";
import Admin from "./components/Admin";
import CreateBlog from "./components/CreateBlog";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:5000/api/blogs");
      const data = await response.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  const addBlog = (newBlog) => {
    setBlogs((prevList) => [...prevList, newBlog]);
  };

  return (
    <BrowserRouter>
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
        <Route path="/BlogPage" element={<BlogPage />} />
        <Route path="/Admin" element={<Admin />} />
        <Route
          path="/create-post"
          element={<CreateBlog onAddBlog={addBlog} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
