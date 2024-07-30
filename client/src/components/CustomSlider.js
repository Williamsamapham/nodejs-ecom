import React, {memo} from "react";
import Slider from "react-slick/lib/slider";
import { Product } from "./";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const CustomSlider = ({ products, ativedTab }) => {
  return (
    <>
      {products && (
        <Slider {...settings}>
          {products?.map((el, index) => (
            <Product
              key={index}
              pid={el._id}
              images={el.images}
              title={el.title}
              price={el.price}
              totalRatings={el.totalRatings}
              ativedTab={ativedTab}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);
