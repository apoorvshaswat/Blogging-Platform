import React from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="main">
      <div className="main_content">
        <div className="main_heading">
          <b>Welcome to Our Blogging Platform</b>
        </div>

        <div className="main_descrp">
          Join our community of writers and readers! Share your thoughts, ideas,
          and stories.
          {/* Whether you're a seasoned blogger or just starting out,
          there's a place for everyone to express themselves and connect with
          others. */}
        </div>

        <div className="main_descrp">
          Log in to explore, share, and create blogs.
        </div>

        <div>
          <button onClick={handleLogin} className="main_button">
            <b>Login</b>
          </button>

          <button onClick={handleSignUp} className="main_button">
            <b>Sign Up</b>
          </button>
        </div>
      </div>
    </div>
  );
}
