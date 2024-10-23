import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditBlog = ({ onUpdate }) => {
  const location = useLocation();
  const { item } = location.state;
  const [title, setTitle] = useState(item.title);
  const [overview, setOverview] = useState(item.overview);
  const [content, setContent] = useState(item.content);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      // const response = await fetch("http://localhost:5000/api/checklogin", {
      //   method: "GET",
      //   credentials: "include",
      // });

      const response = await fetch(
        "https://blogging-platform-1-rp5u.onrender.com/api/checklogin",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        navigate("/login");
      }
    };

    checkLogin();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      title,
      overview,
      content,
      img_src: "/assets/cardimage/Group 1000002773.png",
    };

    // const response = await fetch(
    //   `http://localhost:5000/api/blogs/${item._id}`,
    //   {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(updatedData),
    //     credentials: "include",
    //   }
    // );

    const response = await fetch(
      `https://blogging-platform-1-rp5u.onrender.com/api/blogs/${item._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include",
      }
    );

    if (response.ok) {
      const updatedBlog = await response.json();
      onUpdate(updatedBlog);
      navigate(`/homepage`);
    }
  };

  return (
    <div className="create-blog-bg">
      <div className="create-blog">
        <h2>Edit Blog Post</h2>

        <form onSubmit={handleUpdate}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Overview:</label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button type="submit">Update Blog</button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
