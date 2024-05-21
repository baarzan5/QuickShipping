import React, { useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FormatMoney } from "../utils/FormatMoney";

const MyWishListsPage = () => {
  const { user } = useAuth();
  const { toggleWishList, getUserWishLists, wishLists, addToCart } =
    useProducts();

  useEffect(() => {
    if (user) {
      getUserWishLists(user);
    }
  }, [user, wishLists]);

  return (
    <div className="pt-[30px]">
      <div className="flex flex-col justify-center items-center bg-white mainShadow w-[95%] mx-auto rounded-md">
        <div className="w-full border-b border-b-[#e4e4e5]">
          <h3 className="w-full flex justify-end items-end text-xl font-semibold p-2">
            لیستی دڵخوازەکانم
          </h3>
        </div>

        <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-4 py-2">
          {wishLists.map((wishList, index) => (
            <div
              key={index}
              className="w-[350px] bg-white mainShadow rounded-md flex flex-col justify-center items-center gap-3"
            >
              <div className="relative w-full">
                <Link to={`/product/${wishList.product.id}`}>
                  <img
                    src={wishList.product.productThumbnailImageURL}
                    className="w-full h-[200px] object-cover rounded-tr-md rounded-tl-md"
                    alt=""
                  />
                </Link>

                <button
                  onClick={() => toggleWishList(user, wishList.product)}
                  className="absolute top-2 right-2 rounded-full bg-[#FF0000] text-white p-1 hover:bg-red-600 active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  <FiTrash2 size={25} />
                </button>
              </div>

              <Link
                to={`/product/${wishList.product.id}`}
                className="flex flex-row-reverse justify-between items-center px-2 w-full"
              >
                <p className="text-lg font-semibold">
                  {wishList.product.productName}
                </p>
                <p className="text-xl font-bold">
                  {FormatMoney(wishList.product.productPrice)} IQD
                </p>
              </Link>

              <div className="py-2">
                <button
                  onClick={() => addToCart(user, wishList.product)}
                  className="flex justify-center items-center gap-2 w-[300px] rounded-md p-2 bg-[#FF6F00] text-black hover:text-white transform transition-all duration-100 ease-in-out active:scale-95"
                >
                  <FiShoppingCart size={25} />
                  زیادبکە بۆ سەبەتەی کڕین
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWishListsPage;
