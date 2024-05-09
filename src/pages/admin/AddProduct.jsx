import React from "react";
import { useAuth } from "../../context/AuthContext";

const AddProduct = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <>
          {user.isAdmin ? (
            <div className="flex flex-col justify-start items-start gap-5 w-full p-2">
                <h2 className="text-2xl font-bold">Add Product</h2>

                <div className="flex flex-wrap justify-between items-center w-full">

                    <div className="flex flex-col justify-center items-center gap-4">

                        <div className="flex flex-col justify-start items-start gap-3 mainShadow w-full p-2 rounded-md">
                            <h3 className="text-lg font-semibold">Product Information</h3>

                            <input type="text" placeholder="Product Name" />
                        </div>

                    </div>

                    <div className=""></div>

                </div>
            </div>
          ) : (
            <>404</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default AddProduct;
