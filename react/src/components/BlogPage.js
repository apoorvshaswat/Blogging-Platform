import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const BlogPage = ({ onDelete }) => {
  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();

  const handleDelete = async () => {
    // const response = await fetch(
    //   `http://localhost:5000/api/blogs/${item._id}`,
    //   {
    //     method: "DELETE",
    //     credentials: "include",
    //   }
    // );

    const response = await fetch(
      `https://blogging-platform-1-rp5u.onrender.com/api/blogs/${item._id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      onDelete(item._id);
      navigate("/");
    } else {
      const errorData = await response.json();
      console.error("Error deleting blog post:", errorData.message);
    }
  };

  return (
    <div className="blog1_container">
      <div className="blog1_main">
        <div className="blog1_main_content">
          <b>{item.title}</b>
          <p>{item.overview}</p>
        </div>
      </div>

      <div className="blog1_main_panel">
        <div className="blog1_main_panel_content">
          <p>Content</p>
        </div>

        <div className="blog1_main_panel_buttons">
          <Link to={{ pathname: "/edit-post" }} state={{ item }}>
            <button type="button" className="btn btn-success">
              Edit
            </button>
          </Link>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="blog1_main_overview">
        <p>{item.content}</p>
      </div>
    </div>
  );
};

export default BlogPage;
