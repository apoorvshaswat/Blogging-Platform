import React from "react";
import { Link } from "react-router-dom";

export default function Item(props) {
  const { item } = props;

  return (
    <div className="blog1">
      <img src={item.img_src} alt=""/>
      <p>
        <strong>{item.title}</strong>
      </p>
      <p>{item.overview}</p>
      <Link
        to={{
          pathname: "/Blog_page",
        }}
        state={{ item }}
      >
        <button className="blog_read_button">Read</button>
      </Link>
    </div>
  );
}
