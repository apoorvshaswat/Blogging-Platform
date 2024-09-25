import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <form className="adminform">
      <div className="mb-3">
        <p className="adminlogin">
          <b>Admin Login</b>
        </p>
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <Link
        to={{
          pathname: "/",
        }}
      >
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Link>
    </form>
  );
}
