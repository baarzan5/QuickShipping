import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import Categories from "./Categories";
import { useProducts } from "../context/ProductsContext";

const Header = () => {
  const { user } = useAuth();
  const { getUserWishLists, wishLists, getUserCart, cart } = useProducts();
  const [showCategories, setShowCategories] = useState(false);
  const location = useLocation();

  if (location.pathname.includes("/admin")) return null;

  useEffect(() => {
    if (user) {
      getUserWishLists(user);
      getUserCart(user);
    }
  }, [user, wishLists, cart]);

  return (
    <div
      className="sticky top-0 left-0 w-full h-16 bg-[#F5E5D7] flex flex-row-reverse justify-between items-center px-2"
      style={{ zIndex: 999 }}
    >
      <Link to="/" className="text-2xl font-bold">
        LOGO
      </Link>

      <nav className="">
        <ul className="flex flex-row-reverse justify-center items-center gap-10">
          <li>
            <Link to="/">سەرەتا</Link>
          </li>

          <li className="">
            <button
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
              className="flex flex-row-reverse justify-center items-center gap-1"
            >
              بەشەکان
              <IoIosArrowDown size={25} />
              {/* Show categories when mouse hover */}
              {showCategories && (
                <Categories setShowCategories={setShowCategories} />
              )}
            </button>
          </li>

          <li>
            <Link to="/">دەربارە</Link>
          </li>

          <li>
            <Link to="/">پەیوەندی</Link>
          </li>
        </ul>
      </nav>

      <div className="flex flex-row-reverse justify-center items-center gap-5">
        <Link>
          <CiSearch size={30} title="گەڕان" />
        </Link>

        <div className="relative">
          <p className="absolute -top-4 left-0 w-5 h-5 rounded-full flex justify-center items-center text-center bg-red-600 text-white">
            {wishLists.length}
          </p>
          <Link>
            <CiHeart size={30} title="لیستی دڵخوازەکان" />
          </Link>
        </div>

        <div className="relative">
          <p className="absolute -top-[19px] left-0 w-5 h-5 rounded-full flex justify-center items-center text-center bg-red-600 text-white">
            {cart.length}
          </p>
          <Link>
            <FiShoppingCart size={25} title="سەبەتە" />
          </Link>
        </div>

        {user ? (
          <Link to="/profile">
            <img
              src={user.userImageURL}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
            />
          </Link>
        ) : (
          <Link to="/login">چوونەژوورەوە</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
