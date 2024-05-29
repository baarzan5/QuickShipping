import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { CgClose, CgMathMinus } from "react-icons/cg";
import { IoIosAdd } from "react-icons/io";
import { FormatMoney } from "../utils/FormatMoney";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import UserAddressModal from "../components/modals/UserAddressModal";

const CartPage = () => {
  const { user } = useAuth();
  const { getUserCart, cart, deleteProductFromCart } = useProducts();
  const [orderNote, setOrderNote] = useState("");
  const [showUserAddressModal, setShowUserAddressModal] = useState(false);

  useEffect(() => {
    if (user) {
      getUserCart(user);
    }
  }, [user]);

  let decreaseQuantity = async (cartId, quantity, unitPrice) => {
    if (quantity > 1) {
      const productDoc = doc(db, `users/${user.email}/cart`, cartId);
      const newQuantity = quantity - 1;
      const newTotalPrice = newQuantity * unitPrice;
      await updateDoc(productDoc, {
        quantity: newQuantity,
        totalPrice: newTotalPrice,
      });
      getUserCart(user);
    }
  };

  let increaseQuantity = async (cartId, quantity, unitPrice) => {
    if (quantity) {
      const productDoc = doc(db, `users/${user.email}/cart`, cartId);
      const newQuantity = quantity + 1;
      const newTotalPrice = newQuantity * unitPrice;
      await updateDoc(productDoc, {
        quantity: newQuantity,
        totalPrice: newTotalPrice,
      });
      getUserCart(user);
    }
  };

  const columns = [
    {
      cell: (row) => (
        <button
          title="سرینەوە"
          onClick={() => deleteProductFromCart(user.email, row.id)}
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
      selector: (row) => row.product,
      format: (row) => FormatMoney(row.product),
      cell: (row) => (
        <div className="">
          {row.product.productDiscount ? (
            <>
              {row.product.discountType == "Flat" ? (
                <div className="flex flex-col justify-center items-center gap-2">
                  <p className="text-2xl">
                    {FormatMoney(
                      row.product.productPrice - row.product.productDiscount
                    )}{" "}
                    IQD
                  </p>
                  <p className="text-[#969393] text-sm line-through">
                    {FormatMoney(row.product.productDiscount)}IQD
                  </p>
                  <p className="text-xl">
                    {FormatMoney(
                      row.product.productPrice - row.product.productDiscount
                    )}{" "}
                    IQD
                  </p>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-2">
                  <strong className="text-xl">
                    {FormatMoney(
                      row.product.productPrice *
                        (1 - row.product.productDiscount / 100)
                    )}{" "}
                    IQD
                  </strong>
                  <p className="text-[#969393] text-lg line-through">
                    {FormatMoney(row.product.productPrice)} IQD
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="text-xl">{FormatMoney(row.product.productPrice)}</p>
              <p>{FormatMoney(row.product.productPrice)} IQD</p>
            </div>
          )}
        </div>
      ),
    },
    {
      name: "بڕ",
      selector: (row) => row.quantity,
      cell: (row) => (
        <div className="flex justify-center items-center gap-2">
          {row.quantity === 1 ? (
            <button
              disabled
              className="bg-[#FF6F00]/50 text-white rounded-full p-1 hover:bg-[#FF6F00]/45 transform transition-all duration-100 ease-in-out"
            >
              <CgMathMinus size={25} />
            </button>
          ) : (
            <button
              onClick={() =>
                decreaseQuantity(row.id, row.quantity, row.totalPrice)
              }
              className="bg-[#FF6F00] text-white rounded-full p-1 hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out"
            >
              <CgMathMinus size={25} />
            </button>
          )}
          <p className="text-lg font-semibold">{row.quantity}</p>
          <button
            onClick={() =>
              increaseQuantity(row.id, row.quantity, row.totalPrice)
            }
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
          <strong className="text-lg hover:underline hover:underline-offset-4">
            {row.productName}
          </strong>
        </Link>
      ),
    },
  ];

  const data = cart.map((cartItem) => ({
    id: cartItem.id, // Ensure this is the correct unique identifier for each cart item
    product: cartItem.product,
    productId: cartItem.product.id,
    productThumbnailImageURL: cartItem.product.productThumbnailImageURL,
    productName: cartItem.product.productName,
    quantity: cartItem.quantity,
    productPrice: cartItem.product.productPrice, // This is the unit price
    totalPrice: cartItem.totalPrice,
  }));

  const totalMoney = cart.reduce(
    (acc, cartItem) => acc + cartItem.totalPrice,
    0
  );

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
        <div className="flex flex-row-reverse justify-between items-center w-full px-2 pb-1.5 border-b border-b-[#e4e4e5]">
          <h2 className="text-xl font-semibold">سەبەتەکەم</h2>

          <strong className="text-xl">
            باڵانسەکەم : {FormatMoney(user?.userMoney)} د.ع
          </strong>
        </div>

        {cart.length > 0 ? (
          <>
            <DataTable
              columns={columns}
              data={data}
              customStyles={customStyles}
            />
            <textarea
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="تێبینی ئیختیاری"
              className="text-right w-full border border-[#e4e4e5] rounded-md p-2 resize-none overflow-y-auto"
            ></textarea>

            <div className="flex flex-row-reverse justify-between items-center w-full px-2">
              <strong>کۆی گشتی</strong>
              <strong>{FormatMoney(totalMoney)} IQD</strong>
            </div>

            <div className="flex justify-end items-end">
              <button
                onClick={() => {
                  user?.userMoney >= totalMoney
                    ? setShowUserAddressModal(!showUserAddressModal)
                    : alert("باڵانسی پێویستت نییە بۆ داواکردنی ئەم بەرهەمانە");
                }}
                className="bg-[#FF6F00] w-[150px] text-black rounded-md p-2 transform transition-all duration-100 ease-in-out hover:text-white active:scale-95"
              >
                پشکنین
              </button>

              {showUserAddressModal && (
                <UserAddressModal
                  showUserAddressModal={showUserAddressModal}
                  setShowUserAddressModal={setShowUserAddressModal}
                  user={user}
                  cart={cart}
                  orderNote={orderNote}
                  totalMoney={totalMoney}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center text-center h-full p-3">
            <strong className="text-2xl">سەبەتەی کڕین بەتاڵە</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
