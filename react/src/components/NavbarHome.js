import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent default anchor behavior

    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include", // Include cookies with the request
      });

      if (response.ok) {
        // User successfully logged out
        navigate("/"); // Redirect to the home page
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="header">
      <ul className="nav-links">
        <li>
          <Link to="/homepage" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
