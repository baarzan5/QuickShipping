import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrNotes } from "react-icons/gr";
import { PiUsersThree } from "react-icons/pi";
import { CiLocationOn, CiLogout } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";
import { AUTHACTIONS } from "../../actions/authActions";
import { SiBrandfolder } from "react-icons/si";
import { LuTableProperties } from "react-icons/lu";

const SideBar = () => {
  const { logOutUser, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogOutUser = async () => {
    try {
      await logOutUser();
      navigate("/");
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col p-3 justify-between items-start mainShadow w-full h-full">
      <div className="flex flex-col gap-6 justify-start items-start">
        <h2 className="text-2xl font-bold">LOGO</h2>

        <div className="flex flex-col justify-start items-start gap-3">
          <Link
            to="/admin/home"
            className="flex justify-center items-center gap-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all ease-in-out duration-100 p-2"
          >
            <GoHome size={25} />
            Home
          </Link>

          <Link
            to="/admin/categories"
            className="flex justify-center items-center gap-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all ease-in-out duration-100 p-2"
          >
            <RxDashboard size={25} /> Categories
          </Link>

          <Link
            to="/admin/brands"
            className="flex justify-center items-center gap-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all ease-in-out duration-100 p-2"
          >
            <SiBrandfolder size={25} /> Brands
          </Link>

          <Link
            to="/admin/properties"
            className="flex justify-center items-center gap-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all ease-in-out duration-100 p-2"
          >
            <LuTableProperties size={25} /> Properties
          </Link>

          <Link
            to="/admin/products"
            className="flex justify-center items-center gap-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all ease-in-out duration-100 p-2"
          >
            <HiOutlineShoppingBag size={25} /> Products
          </Link>

          <Link
            to="/admin/orders"
            className="flex justify-center items-center gap-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all ease-in-out duration-100 p-2"
          >
            <GrNotes size={25} /> Orders
          </Link>

          <Link
            to="/admin/customers"
            className="flex justify-center items-center gap-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all ease-in-out duration-100 p-2"
          >
            <PiUsersThree size={25} /> Customers
          </Link>

          <Link
            to="/admin/locations"
            className="flex justify-center items-center gap-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all ease-in-out duration-100 p-2"
          >
            <CiLocationOn size={25} /> Locations
          </Link>
        </div>
      </div>

      <button
        onClick={handleLogOutUser}
        className="flex justify-center items-center gap-1 hover:bg-[#969393]/25 rounded-md active:scale-95 transform transition-all ease-in-out duration-100 p-2"
      >
        <CiLogout size={25} /> Logout
      </button>
    </div>
  );
};

export default SideBar;
