import React from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    navigate("/create-post");
  };

  return (
    <div className="main">
      <div className="main_content">
        <div className="main_heading">
          <b>Welcome to Our Blogging Platform</b>
        </div>

        <div className="main_descrp">
          Join our community of writers and readers! Share your thoughts, ideas,
          and stories. Whether you're a seasoned blogger or just starting out,
          there's a place for everyone to express themselves and connect with
          others.
        </div>

        <div>
          <button onClick={handleCreatePostClick} className="main_button">
            <b>Create New Blog</b>
          </button>
        </div>
      </div>
    </div>
  );
}
