import React from "react";
import Item from "./Item";

export default function ItemList({ itemList }) {
  return (
    <div className="blog_main">
      {itemList.map((item) => (
        <Item key={item.title} item={item} />
      ))}
    </div>
  );
}
