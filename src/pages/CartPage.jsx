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
  const [quantity, setQuantity] = useState(
    cart.map((cartItem) => cartItem.product.quantity)
  );

  useEffect(() => {
    if (user) {
      getUserCart(user);
    }
  }, [user]);

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

  const columns = [
    {
      cell: (row) => (
        <button
          title="سرینەوە"
          onClick={() => deleteProductFromCart(user, row.id)}
          className="hover:bg-[#969393]/15 rounded-full p-1 active:scale-95 transform transition-all ease-in-out duration-100"
        >
          <CgClose size={20} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "کۆی گشتی",
      selector: (row) => row.totalPrice,
      format: (row) => FormatMoney(row.totalPrice),
      cell: (row) => (
        <strong className="text-lg">{FormatMoney(row.totalPrice)} IQD</strong>
      ),
    },
    {
      name: "نرخ",
      selector: (row) => row.price,
      format: (row) => FormatMoney(row.price),
      cell: (row) => (
        <strong className="text-lg">{FormatMoney(row.price)} IQD</strong>
      ),
    },
    {
      name: "بڕ",
      selector: (row) => row.quantity,
      cell: (row) => (
        <div className="flex justify-center items-center gap-2">
          {quantity === 1 ? (
            <button
              disabled
              className="bg-[#FF6F00]/50 text-white rounded-full p-1 hover:bg-[#FF6F00]/45 active:scale-95 transform transition-all duration-100 ease-in-out"
            >
              <CgMathMinus size={25} />
            </button>
          ) : (
            <button
              onClick={decreaseQuantity}
              className="bg-[#FF6F00] text-white rounded-full p-1 hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out"
            >
              <CgMathMinus size={25} />
            </button>
          )}
          <p className="text-lg font-semibold">{row.quantity}</p>
          <button
            onClick={increaseQuantity}
            className="bg-[#FF6F00] text-white rounded-full p-1 hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <IoIosAdd size={25} />
          </button>
        </div>
      ),
    },
    {
      name: "بەرهەم",
      selector: (row) => row.productName,
      cell: (row) => (
        <Link
          to={`/product/${row.productId}`}
          className="flex flex-row-reverse gap-1 items-center"
        >
          <img
            src={row.productThumbnailImageURL}
            alt={row.productName}
            className="h-[75px] object-cover"
          />
          <strong className="text-lg">{row.productName}</strong>
        </Link>
      ),
    },
  ];

  const data = cart.map((cartItem) => ({
    id: cartItem.id, // Ensure this is the correct unique identifier for each cart item
    productId: cartItem.product.product.id,
    productThumbnailImageURL: cartItem.product.product.productThumbnailImageURL,
    productName: cartItem.product.product.productName,
    quantity: cartItem.product.quantity,
    price: cartItem.product.product.productPrice,
    totalPrice: cartItem.product.totalPrice,
  }));

  // Custom styles for the DataTable
  const customStyles = {
    headCells: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
        borderBottom: "1px solid #e4e4e5",
      },
    },
    cells: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "10px",
        padding: "10px",
        borderBottom: "1px solid #e4e4e5",
      },
    },
  };

  return (
    <div className="pt-[30px]">
      <div className="w-[95%] p-2 flex flex-col text-right gap-4 mainShadow rounded-md mx-auto">
        <h2 className="w-full border-b border-b-[#e4e4e5] text-xl font-semibold pb-1.5">
          سەبەتەکەم
        </h2>
        <DataTable columns={columns} data={data} customStyles={customStyles} />
      </div>
    </div>
  );
};

export default CartPage;
