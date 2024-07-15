import React from "react";
import logo from "../assets/logo.png";
import icons from "../ultils/icon";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const { FaPhoneAlt, MdEmail, FaShoppingCart, FaUser } = icons;
const Header = () => {
  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[180px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-4 items-center">
            <FaPhoneAlt color="red" />
            <span className="font-semibold">(+84) 793665088</span>
          </span>
          <span>Thứ 2-Chủ Nhật 9:00-22:00</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-4 items-center">
            <MdEmail color="red" />
            <span className="font-semibold">
              phamvinhquang14042003@gmail.com
            </span>
          </span>
          <span>Online Suport 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6 border-r">
          <FaShoppingCart color="red" />
          <span>0 item(s)</span>
        </div>
        <div className="flex items-center justify-center px-6">
          <FaUser size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
