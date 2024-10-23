import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch("http://localhost:5000/api/checklogin", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        navigate("/login");
      }
    };

    // const checkLogin = async () => {
    //   const response = await fetch(
    //     "https://blogging-platform-1-rp5u.onrender.com/api/checklogin",
    //     {
    //       method: "GET",
    //       credentials: "include",
    //     }
    //   );
    //   if (!response.ok) {
    //     navigate("/login");
    //   }
    // };
    checkLogin();
  }, [navigate]);

  const handleCreate = () => {
    navigate("/create-post");
  };

  return (
    <div className="main">
      <div className="main_content">
        <div className="main_heading">
          <b>Welcome Back!</b>
        </div>

        <div className="main_descrp">
          You’re now logged in to our blogging community.
        </div>

        <div className="main_descrp">
          Dive into the latest blogs, share your own stories, and connect with
          other writers.
        </div>

        <div>
          <button onClick={handleCreate} className="main_button">
            <b>Create a Blog</b>
          </button>
        </div>
      </div>
    </div>
  );
}
