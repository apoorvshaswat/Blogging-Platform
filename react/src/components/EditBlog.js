import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditBlog = ({ onUpdate }) => {
  const location = useLocation();
  const { item } = location.state;
  const [title, setTitle] = useState(item.title);
  const [img_src, setImgSrc] = useState(item.img_src);
  const [overview, setOverview] = useState(item.overview);
  const [content, setContent] = useState(item.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { title, img_src, overview, content };

    setLoading(true);
    setError(null);

    try {
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
        navigate(`/`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error updating blog.");
      }
    } catch (error) {
      setError("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog-bg">
      <div className="create-blog">
        <h2>Edit Blog Post</h2>
        {error && <p className="error-message">{error}</p>}
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

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
