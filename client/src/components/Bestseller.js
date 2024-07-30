import React, { useEffect, useState } from "react";
import { apiGetProduct } from "../apis/Product";
import { CustomSlider } from "./";
import {getNewProduct} from '../store/product/asyncAction'
import { useDispatch, useSelector } from "react-redux";
const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new arrivals" },
];

const Bestseller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [products, setproducts] = useState(null);
  const dispatch = useDispatch();
  const {newProduct} = useSelector(state => state.products)
  const [ativedTab, setAtivedTab] = useState(1);
  const fecthProducts = async () => {
    const response = await apiGetProduct({sort:'-sold'})
    if (response?.success) {
      setBestSeller(response?.products);
      setproducts(response?.products);
    }
  };
  useEffect(() => {
    fecthProducts();
    dispatch(getNewProduct())
  }, []);
  useEffect(() => {
    if (ativedTab === 1) setproducts(bestSeller);
    if (ativedTab === 2) setproducts(newProduct);
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
      <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4">
        <CustomSlider products={products}/>
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
