import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="header">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Register</Link>
        </li>
      </ul>
    </div>
  );
}
