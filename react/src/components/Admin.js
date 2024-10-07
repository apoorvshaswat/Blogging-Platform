import React from "react";

export default function Admin() {
  return (
    <div className="login-container-bg">
      <div className="login-container">
        <h2 className="login-title">Admin Login</h2>

        <form className="login-form">
          <div className="input-group">
            <label className="input-label">
              Username
              <input type="text" required className="input-field" />
            </label>
          </div>
          <div className="input-group">
            <label className="input-label">
              Password
              <input type="password" required className="input-field" />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
