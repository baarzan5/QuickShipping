import React from "react";
import ProductImage from "../../public/product_image.jpg";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <div className="relative">
      <Link to="">
        <img
          src={ProductImage}
          className="w-[250px] h-[300px] rounded-md"
          alt=""
        />
      </Link>

      <div className="absolute top-0 right-0 w-full p-2 flex flex-row-reverse justify-between items-center">
        <button className="bg-black/50 rounded-full p-1 text-white active:scale-95 transform transition-all ease-in-out duration-200">
          <CiHeart size={30} title="زیادبکە بۆ لیستی دڵخوازەکانم" />
        </button>

        <button className="bg-black/50 rounded-full p-1.5 text-white active:scale-95 transform transition-all ease-in-out duration-200">
          <FiShoppingCart size={25} title="زیادبکە بۆ سەبەتەی کڕین" />
        </button>
      </div>

      <Link
        to=""
        className="absolute bottom-0 right-0 w-full h-10 p-1.5 flex flex-row-reverse justify-between items-center bg-black/50 text-white rounded-br-md rounded-bl-md"
      >
        <strong className="text-2xl">قەمیس</strong>
        <strong className="text-lg">25,000 IQD</strong>
      </Link>
    </div>
  );
};

export default ProductCard;
