import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function BlogPage() {
  const location = useLocation();
  const { item } = location.state;

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
            <Link to="/Admin">
              <button type="button" className="btn btn-success">
                Edit
              </button>

              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </Link>
          </div>
        </div>

        <div className="blog1_main_overview">
          <p>{item.content}</p>
        </div>
      
    </div>
  );
}
