import React, { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { FormatMoney } from "../utils/FormatMoney";
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const {
    getUserWishLists,
    wishLists,
    getUserCart,
    cart,
    toggleWishList,
    addToCart,
  } = useProducts();

  useEffect(() => {
    if (user) {
      getUserWishLists(user);
      getUserCart(user);
    }
  }, [user, wishLists, cart]);

  const isWishListed = wishLists.some(
    (wishList) => wishList.product.id == product.id
  );

  return (
    <div className="relative">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.productThumbnailImageURL}
          className="w-[250px] h-[300px] rounded-md object-cover"
          alt=""
        />
      </Link>

      <div className="absolute top-0 right-0 w-full p-2 flex flex-row-reverse justify-between items-center">
        {isWishListed ? (
          <button
            onClick={() => toggleWishList(user, product)}
            className="bg-black/50 rounded-full p-1 text-white active:scale-95 transform transition-all ease-in-out duration-200"
          >
            <IoIosHeart
              color="red"
              size={30}
              title="بیسڕەوە لە لستی دڵخوازەکانم"
            />
          </button>
        ) : (
          <button
            onClick={() => toggleWishList(user, product)}
            className="bg-black/50 rounded-full p-1 text-white active:scale-95 transform transition-all ease-in-out duration-200"
          >
            <IoIosHeartEmpty size={30} title="زیادبکە بۆ لیستی دڵخوازەکانم" />
          </button>
        )}

        <button
          onClick={() => addToCart(user, product)}
          className="bg-black/50 rounded-full p-1.5 text-white active:scale-95 transform transition-all ease-in-out duration-200"
        >
          <FiShoppingCart size={25} title="زیادبکە بۆ سەبەتەی کڕین" />
        </button>
      </div>

      <Link
        to={`/product/${product.id}`}
        className="absolute bottom-0 right-0 w-full h-10 p-1.5 flex flex-row-reverse justify-between items-center bg-black/50 text-white rounded-br-md rounded-bl-md"
      >
        <strong className="text-2xl">{product.productName}</strong>
        <strong className="text-lg">
          {FormatMoney(product.productPrice)} IQD
        </strong>
      </Link>
    </div>
  );
};

export default ProductCard;
