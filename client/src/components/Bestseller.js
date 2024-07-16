import React, { useEffect, useState } from "react";
import { apiGetProduct } from "../apis/Product";
import { Product } from "./";
import Slider from "react-slick";
const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new arrivals" },
];
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const Bestseller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  console.log(bestSeller);
  const [ativedTab, setAtivedTab] = useState(1);
  const fecthProducts = async () => {
    const response = await Promise.all([
      apiGetProduct({ sort: "-sold" }),
      apiGetProduct({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) setBestSeller(response[0]?.products);
    if (response[1]?.success) setNewProduct(response[1]?.products);
  };
  useEffect(() => {
    fecthProducts();
  }, []);
  return (
    <>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold capitalize border-r cursor-pointer text-gray-400 ${
              ativedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setAtivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Slider {...settings}>
          {bestSeller?.map((el) => (
            <Product key={el._id} 
            images={el.images}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Bestseller;
