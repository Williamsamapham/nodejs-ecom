import icons from "./icon";

const { FaRegStar, FaStar } = icons;

export const formatMoney = (number) =>
  Number(number.toFixed(1)).toLocaleString();

export const renderStar = (number) => {
  if (!Number(number)) return;
  const starArray = [];
  for (let i = 0; i < +number; i++) starArray.push(<FaStar />);
  for (let i = 5; i < +number; i--) starArray.push(<FaRegStar />);
  return starArray;
};
