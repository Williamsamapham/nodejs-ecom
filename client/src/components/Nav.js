import React from "react";
import { navigator } from "../ultils/constant";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <div className="border-y mb-6 w-main h-[48px] py-2 text-sm flex items-center">
      {navigator.map((el) => (
        <NavLink to={el.path} key={el.id} className={({isActive}) => isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'}>
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Nav;
