import React from "react";
import ProductImage from "../../public/product_image.jpg";
import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductsContext";

const Hero = () => {
  const { products } = useProducts();

  return (
    <div className="relative bg-[#F5E5D7] w-full h-[600px] flex flex-col justify-center items-center gap-5 pt-48 pb-2">
      {products.slice(0, 1).map((product) => (
        <div className="flex flex-wrap flex-row-reverse justify-start items-center mx-auto gap-10">
          <img
            src={product.productThumbnailImageURL}
            className="w-[350px] h-[400px] rounded-md"
            alt=""
          />

          <div className="flex flex-col justify-end items-end gap-3">
            <h2 className="text-3xl font-semibold">{product.productName}</h2>
            <p className="text-right max-w-[400px]">
              {product.productDescription.slice(0, 300)}
            </p>

            <div className="flex flex-wrap flex-row-reverse justify-center items-center gap-3">
              <button className="bg-[#FF6F00] py-2 px-3 text-white rounded-md active:scale-95 transform transition-all ease-in-out duration-100 hover:bg-[#e47017]">
                زیادی بکە بۆ لیستی دڵخوازەکان
              </button>

              <button className="bg-[#FF6F00] py-2 px-3 text-white rounded-md active:scale-95 transform transition-all ease-in-out duration-100 hover:bg-[#e47017]">
                ئێستا بیکڕە
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="relative flex flex-col justify-end items-end gap-3">
        <h2 className="text-xl font-semibold">مامەڵەکانی ئەمڕۆ</h2>

        {/* <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
