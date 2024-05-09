import React, { useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "./ProductCard";

const NewestProducts = () => {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="pt-[160px]">
      <div className="flex flex-col justify-center items-center gap-5 bg-white mainShadow w-[95%] mx-auto rounded-md p-2">
        <div className="flex flex-row-reverse justify-between items-center w-full px-2">
          <h2 className="text-2xl font-semibold">نوێترین بەرهەمەکان</h2>

          <div className="flex flex-row-reverse justify-center items-center gap-5">
            <button
              className="bg-white rounded-full p-1 mainShadow active:scale-95 transform transition-all ease-in-out duration-100"
              onClick={goNext}
            >
              <MdOutlineKeyboardArrowRight size={35} />
            </button>
            <button
              className="bg-white rounded-full p-1 mainShadow active:scale-95 transform transition-all ease-in-out duration-100"
              onClick={goPrev}
            >
              <MdOutlineKeyboardArrowLeft size={35} />
            </button>
          </div>
        </div>

        <div className="relative flex flex-row-reverse justify-center items-center w-full">
          <Swiper
            ref={swiperRef}
            loop
            slidesPerView={5}
            spaceBetween={25}
            width={1300}
          >
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewestProducts;
