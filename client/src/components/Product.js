import React, { useState } from "react";
import { formatMoney, renderStar } from "../ultils/helper";
import { SelectOption } from "./";
import icons from "../ultils/icon";

const { FaEye, IoMenu, FaHeart } = icons;
const Product = ({ images, title, price, totalRatings, pid }) => {
  const [isShowOption, setisShowOption] = useState(false);
  return (
    <div className="w-full text-base px-[10px]">
      <div
        className=" w-full border p-[15px] flex flex-col items-center"
        onMouseEnter={(e) => {
          setisShowOption(true);
        }}
        onMouseLeave={(e) => {
          setisShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] flex justify-center left-0 right-0 gap-2 animate-slide-top">
              <SelectOption icon={<FaEye />} />
              <SelectOption icon={<IoMenu />} />
              <SelectOption icon={<FaHeart />} />
            </div>
          )}
          <img
            src={
              images?.[0] ||
              "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            alt="Product"
            className="w-[274px] h-[274px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="flex h-4">{renderStar(totalRatings)}</span>
          <span className="line-clamp-1">{title}</span>
          <span>{`${formatMoney(price)}`} VND</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
