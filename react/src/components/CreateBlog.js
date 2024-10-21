import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog({ onAddBlog }) {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    content: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // const checkLogin = async () => {
    //   const response = await fetch("http://localhost:5000/api/checklogin", {
    //     method: "GET",
    //     credentials: "include",
    //   });
    //   setIsAuthenticated(response.ok);
    //   if (!response.ok) {
    //     navigate("/login");
    //   }
    // };

    const checkLogin = async () => {
      const response = await fetch(
        "https://blogging-platform-1-rp5u.onrender.com/api/checklogin",
        {
          method: "GET",
          credentials: "include",
        }
      );
      setIsAuthenticated(response.ok);
      if (!response.ok) {
        navigate("/login");
      }
    };
    checkLogin();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlogPost = {
      ...formData,
      img_src: "/assets/cardimage/Group 1000002773.png",
    };

    // const response = await fetch("http://localhost:5000/api/blogs", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newBlogPost),
    //   credentials: "include",
    // });

    const response = await fetch(
      "https://blogging-platform-1-rp5u.onrender.com/api/blogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlogPost),
        credentials: "include",
      }
    );

    if (response.ok) {
      const result = await response.json();
      onAddBlog(result);
      navigate("/");
    } else {
      const error = await response.json();
      console.error("Failed to create blog post:", error.message);
    }
  };

  return (
    <div className="create-blog-bg">
      <div className="create-blog">
        <h2>Create a New Blog Post</h2>
        {isAuthenticated ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Overview</label>
              <input
                type="text"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Create Blog Post</button>
          </form>
        ) : (
          <p>You need to log in to create a blog post.</p>
        )}
      </div>
    </div>
  );
}
