import React from "react";
import { Banner, Bestseller, Sidebar } from "../../components";
const Home = () => {
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[20%] flex-auto">
          <Sidebar />
          <span>Deal Daily</span>
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto">
          <Banner />
          <Bestseller />
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};

export default Home;
