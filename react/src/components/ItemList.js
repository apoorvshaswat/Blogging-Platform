import React from "react";
import Item from "./Item";

export default function ItemList({ itemList }) {
  return (
    <div className="blog_main">
      {itemList.length > 0 ? (
        itemList.map((item) => <Item key={item._id} item={item} />)
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
}
