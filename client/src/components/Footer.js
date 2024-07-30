import React, { memo } from "react";
import icons from "../ultils/icon";

const { MdEmail } = icons;
const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[13px] text-gray-100">ĐĂNG KÝ BẢN TIN</span>
            <small className="text-[13px] text-gray-300">
              Đăng ký ngay và nhận bản tin hàng tuần
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-4 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100 placeholder:text-sm placeholder:text-gray-100 placeholder:opacity-50"
              type="text"
              placeholder="Email Address"
            />
            <div className="h-[56px] w-[56px] pr-0 bg-[#F04646] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] bg-gray-800 flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              ABOUT US
            </h3>
            <span>
              <span>Address: </span>
              <span className="opacity-70">
                160/2 Y-Moal Emuol TP.Buon Ma Thuot
              </span>
            </span>
            <span>
              <span>Phone: </span>
              <span className="opacity-70">(+84)793665088</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-70">
                phamvinhquang14042003@gmail.com
              </span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              INFORMATION
            </h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store</span>
            <span>Location</span>
            <span>Today's Deals</span>
            <span>Contact</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span>Help</span>
            <span>Free Shipping</span>
            <span>FAQs</span>
            <span>Return & Exchange</span>
            <span>Testimonials</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
            #PHAMVINHQUANG1404
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
