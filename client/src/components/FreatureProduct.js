import React, { useEffect, useState } from "react";
import { ProductCard } from "./";
import { apiGetProduct } from "../apis";

const FreatureProduct = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProduct({
      limit: 9,
    });
    if (response.success) setProducts(response.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FREATURE PRODUCT
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {products?.map((el) => (
          <ProductCard
            key={el.id}
            images={el.images}
            title={el.title}
            price={el.price}
            totalRatings={el.totalRatings}
          />
        ))}
      </div>
    </div>
  );
};

export default FreatureProduct;
