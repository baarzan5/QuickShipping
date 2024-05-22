import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "../../context/AuthContext";
import { hideScrollBar } from "../../hooks/hideScrollBar";
import { useProducts } from "../../context/ProductsContext";
import { FormatMoney } from "../../utils/FormatMoney";
import { CgClose, CgMathMinus } from "react-icons/cg";
import { IoIosAdd } from "react-icons/io";

const AddToCartModal = ({
  showAddToCartModal,
  setShowAddToCartModal,
  product,
}) => {
  hideScrollBar(showAddToCartModal);
  const { user } = useAuth();
  const { addToCart } = useProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (product) {
      const price =
        product.discountType === "Flat"
          ? quantity * product.productPrice - product.productDiscount
          : quantity *
            product.productPrice *
            (1 - product.productDiscount / 100);
      setTotalPrice(price);
    }
  }, [product, quantity]);

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

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
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      onClick={() => setShowAddToCartModal(!showAddToCartModal)}
      style={{ zIndex: 999 }}
    >
      <div
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[400px] overflow-y-auto bg-white rounded-md flex justify-between items-start gap-2 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-start items-start gap-2">
          <Suspense fallback={<>Loading...</>}>
            <div className="flex justify-start items-start gap-2">
              <div className="flex flex-col justify-start items-center gap-2">
                {product.productImageURLS.map((productImageURL, index) => (
                  <img
                    key={index}
                    src={productImageURL}
                    className={`h-[50px] rounded-md cursor-pointer ${
                      selectedImageIndex === index
                        ? "border-2 border-[#FF6F00]"
                        : ""
                    }`}
                    alt=""
                    onClick={() => handleImageSelect(index)}
                  />
                ))}
              </div>

              <div>
                <img
                  src={product.productImageURLS[selectedImageIndex]}
                  className="w-full h-[270px] rounded-md"
                  alt=""
                />
              </div>
            </div>
          </Suspense>
        </div>

        <div className="flex flex-col justify-start items-start gap-2.5">
          <button
            title="داخستن"
            onClick={() => setShowAddToCartModal(!showAddToCartModal)}
            className="hover:bg-[#969393]/15 p-1 rounded-full active:scale-95 transform transition-all ease-in-out duration-100"
          >
            <CgClose size={25} />
          </button>

          <h3 className="text-lg font-semibold">{product.productName}</h3>
          <div className="flex justify-center items-center gap-1">
            {product.productDiscount ? (
              <>
                {product.discountType == "Flat" ? (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-2xl text-[#FF6F00]">
                        {FormatMoney(
                          product.productPrice - product.productDiscount
                        )}
                      </p>
                      <p className="text-[#969393] text-sm line-through">
                        {FormatMoney(product.productDiscount)}IQD
                      </p>
                    </div>
                    <p className="text-xl">
                      کۆی گشتی نرخ :
                      <p>
                        {FormatMoney(
                          quantity * product.productPrice -
                            product.productDiscount
                        )}{" "}
                        IQD
                      </p>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-2xl text-[#FF6F00]">
                        {FormatMoney(
                          product.productPrice *
                            (1 - product.productDiscount / 100)
                        )}
                      </p>
                      <p className="text-[#969393] text-sm line-through">
                        {FormatMoney(product.productPrice)}
                      </p>
                    </div>
                    <p className="text-xl">
                      کۆی گشتی نرخ :{" "}
                      {FormatMoney(
                        quantity *
                          product.productPrice *
                          (1 - product.productDiscount / 100)
                      )}{" "}
                      IQD
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-xl">{FormatMoney(product.productPrice)}</p>
                <p>
                  کۆی گستی نرخ : {FormatMoney(quantity * product.productPrice)}{" "}
                  IQD
                </p>
              </div>
            )}{" "}
            IQD : نرخ
          </div>

          <div className="flex justify-center items-center gap-2">
            {quantity == 1 ? (
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

            <p>{quantity}</p>

            <button
              onClick={increaseQuantity}
              className="bg-[#FF6F00] text-white rounded-full p-1 hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out"
            >
              <IoIosAdd size={25} />
            </button>
          </div>

          <button
            onClick={() => addToCart(user, { product, quantity, totalPrice })}
            className="bg-[#FF6F00] text-white p-2 rounded-md hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            زیادبکە بۆ لیستی سەبەتەی کڕین
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
