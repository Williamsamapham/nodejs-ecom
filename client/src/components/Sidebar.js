import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const categories = useSelector((state) => state.app.categories);
  console.log(categories);
  return (
    <div className="flex flex-col border">
      {categories?.map((el, index) => (
        <NavLink
          key={index}
          to={`${el.slug}`}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 pt-[15px] pb-[14] text-sm hover:text-main"
              : "px-5 pt-[15px] pb-[14] text-sm hover:text-main"
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
