import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import Categories from "./Categories";
import { useProducts } from "../context/ProductsContext";
import { BiMenuAltRight } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const Header = () => {
  const { user } = useAuth();
  const { getUserWishLists, wishLists, getUserCart, cart } = useProducts();
  const [showCategories, setShowCategories] = useState(false);
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);

  if (location.pathname.includes("/admin")) return null;

  useEffect(() => {
    if (user) {
      getUserWishLists(user);
      getUserCart(user);
    }
  }, [user]);

  const memorizedWishListsLength = useMemo(() => {
    return wishLists.length;
  }, [wishLists]);

  const memorizedCartLength = useMemo(() => {
    return cart.length;
  }, [cart]);

  return (
    <div
      className="sticky top-0 left-0 w-full h-16 bg-[#F5E5D7]/95 backdrop-blur-sm flex flex-row-reverse justify-between items-center px-2"
      style={{ zIndex: 999 }}
    >
      <div className="flex justify-center items-center gap-2">
        <Link to="/" className="text-2xl font-bold">
          LOGO
        </Link>

        <button onClick={() => setOpenNav(!openNav)} className="md:hidden flex">
          {openNav ? <CgClose size={30} /> : <BiMenuAltRight size={30} />}
        </button>
      </div>

      <nav className="md:flex hidden">
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
        <div className="md:flex flex-row-reverse justify-center items-center gap-5 hidden">
          <Link>
            <CiSearch size={30} title="گەڕان" />
          </Link>

          <div className="relative">
            <p className="absolute -top-4 left-0 w-5 h-5 rounded-full flex justify-center items-center text-center bg-red-600 text-white">
              {memorizedWishListsLength}
            </p>
            <Link to={`${user ? "/wishlists" : "/login"}`}>
              <CiHeart size={30} title="لیستی دڵخوازەکان" />
            </Link>
          </div>

          <div className="relative">
            <p className="absolute -top-[19px] left-0 w-5 h-5 rounded-full flex justify-center items-center text-center bg-red-600 text-white">
              {memorizedCartLength}
            </p>

            <Link to={`${user ? "/cart" : "/login"}`}>
              <FiShoppingCart size={25} title="سەبەتە" />
            </Link>
          </div>
        </div>

        <div className="flex">
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

      {openNav && (
        <div className="absolute top-14 left-0 w-full bg-[#F5E5D7]/95 p-2 md:hidden flex flex-col justify-end items-end gap-4">
          <nav className="">
            <ul className="flex flex-col justify-end items-end gap-4">
              <li onClick={() => setOpenNav(!openNav)}>
                <Link to="/">سەرەتا</Link>
              </li>

              <li className="flex flex-col justify-center items-center gap-2">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex flex-row-reverse justify-center items-center gap-1"
                >
                  بەشەکان
                  <IoIosArrowDown size={25} />
                </button>

                {showCategories && (
                  <Categories setShowCategories={setShowCategories} />
                )}
              </li>

              <li onClick={() => setOpenNav(!openNav)}>
                <Link to="/">دەربارە</Link>
              </li>

              <li onClick={() => setOpenNav(!openNav)}>
                <Link to="/">پەیوەندی</Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col justify-end items-end gap-7">
            <div
              onClick={() => setOpenNav(!openNav)}
              className="flex flex-row-reverse justify-center items-center gap-2"
            >
              <CiSearch size={30} title="گەڕان" />
              <p>گەڕان</p>
            </div>

            <div className="relative">
              <p className="absolute -top-4 right-0 w-5 h-5 rounded-full flex justify-center items-center text-center bg-red-600 text-white">
                {memorizedWishListsLength}
              </p>
              <Link
                onClick={() => setOpenNav(!openNav)}
                to={`${user ? "/wishlists" : "/login"}`}
                className="flex flex-row-reverse justify-center items-center gap-2"
              >
                <CiHeart size={30} title="لیستی دڵخوازەکان" />
                <p>لیستی دڵخوازەکان</p>
              </Link>
            </div>

            <div className="relative">
              <p className="absolute -top-4 right-0 w-5 h-5 rounded-full flex justify-center items-center text-center bg-red-600 text-white">
                {memorizedCartLength}
              </p>

              <Link
                onClick={() => setOpenNav(!openNav)}
                to={`${user ? "/cart" : "/login"}`}
                className="flex flex-row-reverse justify-center items-center gap-2"
              >
                <FiShoppingCart size={25} title="سەبەتە" />
                <p>سەبەتە</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
