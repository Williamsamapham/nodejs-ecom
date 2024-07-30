import React from "react";
import { formatMoney, renderStar } from "../ultils/helper";

const ProductCard = ({ images, title, price, totalRatings }) => {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <div className="flex w-full border">
        <img
          src={
            images?.[0] ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt="product"
          className="w-[90px] object-contain"
        />
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm">{title}</span>
          <span className="flex h-4">{renderStar(totalRatings)?.map((el,index) => {
            return <span key={index}>{el}</span>
          })}</span>
          <span>{`${formatMoney(price)}`} VND</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
