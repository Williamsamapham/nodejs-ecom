import React from "react";

const Product = ({ images }) => {
  return (
    <div className="w-1/3">
      <img
        src={images?.[0] || ""}
        alt="Product"
        className="w-[243px] h-[243px] object-cover"
      />
    </div>
  );
};

export default Product;
