import React from "react";
import {
  Banner,
  Bestseller,
  Sidebar,
  DealDayly,
  FreatureProduct,
  CustomSlider,
} from "../../components";
import { useSelector } from "react-redux";
const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDayly />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
          <Banner />
          <Bestseller />
        </div>
      </div>
      <div className="my-8">
        <FreatureProduct />
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          NEW ARRIVAL
        </h3>
        <div className="mt-4 mx-[-10px]">
          <CustomSlider products={newProducts} />
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          BLOG POST
        </h3>
      </div>
    </>
  );
};

export default Home;
