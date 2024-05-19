import React from "react";
import { useAuth } from "../context/AuthContext";
import { FormatMoney } from "../utils/FormatMoney";
import { FiEdit } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <div className="flex flex-col justify-center items-center gap-5 p-2">
          <div className="mainShadow w-full h-[250px] p-2 flex flex-row-reverse justify-between items-start rounded-md">
            <div className="flex flex-col justify-end items-end gap-3">
              <img
                src={user.userImageURL}
                className="w-16 h-16 object-cover rounded-full"
                alt=""
              />
              <h3 className="text-lg font-semibold">{user.fullName}</h3>
              <h3 className="text-lg font-semibold">
                {user.email ? user.email : user.phoneNumber}
              </h3>
              <div className="flex flex-row-reverse justify-center items-center gap-1">
                <h3 className="text-2xl font-semibold">
                  {FormatMoney(user.userMoney)}
                </h3>
                <p className="pt-3 text-gray-500">د.ع</p>
              </div>
              <h4>
                سەرفکردوو{" "}
                <span className="text-lg font-semibold">
                  {FormatMoney(user.userMoneySpent)}
                </span>{" "}
                د.ع
              </h4>
            </div>

            <div className="flex flex-col justify-between items-start h-full">
              <button className="flex justify-center items-center gap-2 border border-[#FF6F00] text-[#FF6F00] p-1 rounded-md hover:bg-[#FF6F00] hover:text-white transform transition-all duration-100 ease-in-out active:scale-95">
                <p>دەستکاریکردنی هەژمار</p>
                <FiEdit size={25} />
              </button>

              <button className="flex justify-center items-center gap-2 border border-[#FF0000] text-[#FF0000] p-1 rounded-md hover:bg-[#FF0000] hover:text-white transform transition-all duration-100 ease-in-out active:scale-95">
                <p>چوونەدەرەوە</p>
              <IoIosLogOut size={25} />
              </button>
            </div>
          </div>

          <div className="flex flex-row-reverse flex-wrap justify-end items-end gap-4">
            <Link to="/add-balance" className="flex justify-end items-center px-2 gap-5 w-[300px] h-[115px] bg-white rounded-md border border-[#e4e4e5] hover:mainShadow transform transition-all duration-100 ease-in-out">
                زیادکردنی باڵانس
            </Link>
          </div>

        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default ProfilePage;
