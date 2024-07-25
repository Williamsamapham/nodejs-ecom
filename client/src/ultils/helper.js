import icons from "./icon";

const { FaRegStar, FaStar } = icons;

export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

export const renderStar = (number, size) => {
  if (!Number(number)) return ;
  const starArray = [];
  for (let i = 0; i < +number; i++) starArray.push(<FaStar color="orange" size={size || 16}/>);
  for (let i = 5; i < +number; i--)
    starArray.push(<FaRegStar color="orange" size={size || 16}/>);
  return starArray;
};
