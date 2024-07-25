import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icon";
import { apiGetProduct } from "../apis/Product";
import { formatMoney, renderStar } from "../ultils/helper";
import { Countdown } from "./";
const { FaStar, IoMenu } = icons;
let idInterval;
const DealDayly = () => {
  const [dealDayly, setDealDayly] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const fetchDealDayly = async () => {
    const response = await apiGetProduct({
      limit: 1,
      page: Math.round(Math.random() * 5),
    });
    if (response.success) {
      setDealDayly(response.products[0]);
      const h = 24- new Date().getHours()
        const m = 60 - new Date().getMinutes();
        const s = 60 - new Date().getSeconds();
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }else {
    setHours(0);
    setMinutes(59);
    setSeconds(59);
    }
  };
  useEffect(() => {
    idInterval = setInterval(() => {
      if (seconds > 0) setSeconds((prev) => prev - 1);
      else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [hours, minutes, seconds, expireTime]);
  useEffect(() => {
    clearInterval(idInterval);
    fetchDealDayly();
  }, [expireTime]);
  return (
    <div className="border w-full flex-auto">
      <div className="flex justify-between items-center p-4 w-full">
        <span className="flex-1 flex justify-center">
          <FaStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] text-center flex justify-center text-gray-700">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        <img
          src={
            dealDayly?.images?.[0] ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt="Product"
          className="w-full object-contain"
        />
        <span className="flex h-4">
          {renderStar(dealDayly?.totalRatings, 20)}
        </span>
        <span className="line-clamp-1 text-center">{dealDayly?.title}</span>
        <span>{`${formatMoney(dealDayly?.price)}`} VND</span>
      </div>
      <div className="px-4 mt-8">
        <div className="flex mb-4 justify-center gap-2 items-center">
          <Countdown unit={"Giờ"} number={hours} />
          <Countdown unit={"Phút"} number={minutes} />
          <Countdown unit={"Giây"} number={seconds} />
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          <IoMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDayly);
