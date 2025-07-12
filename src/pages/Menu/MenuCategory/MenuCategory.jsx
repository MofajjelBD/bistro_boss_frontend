import React from "react";
import MenuItem from "../../shared/MenuItem/MenuItem";
import Cover from "../../shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div>
      {title && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-10 my-10">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center my-4">
        <Link to={`/order/${title || "salad"}`}>
          <button className="btn btn-outline border-0 border-b-4 hover:bg-transparent">
            ORDER YOUR FAVOURITE FOOD
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
