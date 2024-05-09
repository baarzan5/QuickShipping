import React from "react";
import { useAuth } from "../../context/AuthContext";
import SideBar from "../../components/admin/SideBar";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <>
          {user.isAdmin ? (
            <div className="grid grid-cols-4 gap-5 w-full h-screen">
              <SideBar />

              <div className="col-span-3 p-2 w-full">
                <div className="flex flex-col justify-center items-center gap-5 w-full p-3">
                  <header className="sticky top-0 right-0 flex justify-between items-center w-full border-b border-b-[#969393]/25 pb-2">
                    <h2 className="text-2xl font-bold">Products</h2>

                    <Link
                      to="/admin/add-product"
                      className="flex justify-center items-center gap-0.5 p-2 hover:bg-[#969393]/25 rounded-md transform transition-all ease-in-out duration-100 active:scale-95"
                    >
                      <IoIosAdd size={25} />
                      Add product
                    </Link>
                  </header>
                </div>
              </div>
            </div>
          ) : (
            <>404</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default ProductsPage;
