import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { CgClose, CgMathMinus } from "react-icons/cg";
import { IoIosAdd } from "react-icons/io";
import { FormatMoney } from "../utils/FormatMoney";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const CartPage = () => {
  const { user } = useAuth();
  const { deleteProductFromCart, getUserCart, cart } = useProducts();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (user) {
      getUserCart(user);
    }
  }, [user, cart]);

  const columns = [
    {
      product: "بەرهەم",
      selector: row => row.product,
    },

    {
      quantity: "بڕ",
      selector: row => row.quantity,
    },

    {
      price: "نرخ",
      selector: row => row.price,
    },

    {
      totalPrice: "کۆی گشتی",
      selector: row => row.totalPrice,
    },
  ];

  const data = [
    cart.map((cartItem, index) => {
      return {
        id: index,
        product: [
          cartItem.product.productThumbnailImageURL,
          cartItem.product.productName,
        ],
        quantity: cartItem.quantity,
        price: cartItem.product.productPrice,
        totalPrice: cartItem.totalPrice,
      };
    }),
  ];

  let decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  let increaseQuantity = () => {
    if (quantity) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="pt-[30px]">
      <div className="w-[95%] p-2 flex flex-col text-right gap-4 mainShadow rounded-md mx-auto">
        <h2 className="w-full border-b border-b-[#e4e4e5] text-xl font-semibold pb-1.5">
          سەبەتەکەم
        </h2>
        <DataTable columns={columns} data={data}></DataTable>
        <div className="w-full border border-blue-600 text-left">
          <button
            onClick={() => deleteProductFromCart(user, cartItem.id)}
            className="hover:bg-[#969393]/15 rounded-full p-1 active:scale-95 transform transition-all ease-in-out duration-100"
          >
            <CgClose size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
