import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog({ onAddBlog }) {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    content: "",
  });

  const navigate = useNavigate();

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

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlogPost),
    });

    // const response = await fetch("http://localhost:5000/api/blogs", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newBlogPost),
    // });

    const result = await response.json();
    onAddBlog(result);
    navigate("/");
  };

  return (
    <div className="create-blog-bg">
      <div className="create-blog">
        <h2>Create a New Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Title
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Overview
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Content
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}
