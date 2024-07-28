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
  const [produts, setProduts] = useState(null);
  const [ativedTab, setAtivedTab] = useState(1);
  const fecthProducts = async () => {
    const response = await Promise.all([
      apiGetProduct({ sort: "-sold" }),
      apiGetProduct({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSeller(response[0]?.products);
      setProduts(response[0].products);
    }
    if (response[1]?.success) setNewProduct(response[1]?.products);
  };
  useEffect(() => {
    fecthProducts();
  }, []);
  useEffect(() => {
    if (ativedTab === 1) setProduts(bestSeller);
    if (ativedTab === 2) setProduts(newProduct);
  }, [ativedTab, bestSeller, newProduct]);
  return (
    <>
      <div className="flex text-[20px] ml-[-32px] ">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase px-8 border-r cursor-pointer text-gray-400 ${
              ativedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setAtivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className=" mx-[-10px] border-t-2 border-main pt-4">
        <Slider {...settings}>
          {produts?.map((el) => (
            <Product
              key={el._id}
              pid={el._id}
              images={el.images}
              title={el.title}
              price={el.price}
              totalRatings={el.totalRatings}
            />
          ))}
        </Slider>
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="https://theme.hstatic.net/200000427375/1000801978/14/brand_1.jpg?v=511"
          alt="Banner"
          className="flex-1 w-[30%] object-contain "
        />
        <img
          src="https://theme.hstatic.net/200000427375/1000801978/14/brand_2.jpg?v=511"
          alt="Banner"
          className="flex-1 w-[30%] object-contain"
        />
      </div>
    </>
  );
};

export default Bestseller;
