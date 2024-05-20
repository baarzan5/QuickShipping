import React, { Suspense, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { Link, useParams } from "react-router-dom";
import { FormatMoney } from "../utils/FormatMoney";
import { FaMinus } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { CgMathMinus } from "react-icons/cg";

const ProductPage = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const { products, getUserWishLists, wishLists, toggleWishList, addToCart } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the index of the selected image
  const [quantity, setQuantity] = useState(1);

  const getProduct = () => {
    const foundProduct = products.find((product) => product.id == productId);
    setProduct(foundProduct);
  };

  useEffect(() => {
    getProduct();
  }, [products, productId]);

  useEffect(() => {
    if(user){
      getUserWishLists(user);
    }
  }, [user, wishLists]);

  const isWishList = wishLists.some((wishList) => wishList.product.id == product.id);

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
    <div className="pt-[30px] w-full">
      {product ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-row-reverse flex-wrap justify-between items-start w-full p-3">
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
                      className="w-full h-[300px] rounded-md"
                      alt=""
                    />
                  </div>
                </div>
              </Suspense>
            </div>

            <div className="flex flex-col justify-start items-start gap-4">
              <h1 className="text-2xl font-bold">{product.productName}</h1>
              <p className="w-[500px]">وەسف : {product.productDescription}</p>
              <p>
                ماوەی گەیاندن: <strong>{product.shippingDays} ڕۆژ</strong>
              </p>
              <p>
                هاوپۆل:{" "}
                <Link
                  to={`/category/${product.productCategory.categorySlug}`}
                  className="text-[#FF6F00] hover:text-[#FF6F00]/75"
                >
                  {product.productCategory.categoryName}
                </Link>
              </p>
              <p className="flex flex-row-reverse justify-center items-center gap-1">
                :براند
                <img
                  src={product.productBrand.brandImageURL}
                  title={`${product.productBrand.brandName} بڕاندی`}
                  alt=""
                  className="h-10"
                />
              </p>
              <p className="flex justify-center items-center gap-1">
                {product.productDiscount ? (
                  <>
                    {product.discountType == "Flat" ? (
                      <div className="flex justify-center items-center gap-2">
                        <p className="text-2xl text-red-500">
                          {FormatMoney(
                            quantity * quantity.productPrice -
                              product.productDiscount
                          )}
                        </p>
                        <p className="text-[#969393] text-sm line-through">
                          {FormatMoney(product.productDiscount)}IQD
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <p className="text-2xl text-red-500">
                          {FormatMoney(
                            quantity *
                              quantity.productPrice *
                              (1 - product.productPrice / 100)
                          )}
                        </p>
                        <p className="text-[#969393] text-sm line-through">
                          {FormatMoney(product.productPrice)}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-xl">
                    {FormatMoney(quantity * product.productPrice)}
                  </p>
                )}{" "}
                IQD : نرخ
              </p>
              <p className="flex justify-center items-center gap-2">
                {product.productColors.map((color) => (
                  <span
                    style={{
                      backgroundColor: `#${color.colorCode}`,
                      padding: "5px",
                      borderRadius: "8px",
                      width: "40px",
                      height: "40px",
                    }}
                    title={`${color.colorName} ڕەنگی`}
                  ></span>
                ))}
                :رەنگ
              </p>

              <div className="">
                {product.productAttributes.map((productAttribute, index) => (
                  <div
                    key={index}
                    className="flex flex-row-reverse justify-start items-center gap-6"
                  >
                    :{productAttribute.attributeName}
                    {productAttribute.subAttributes.map(
                      (subAttribute, index) => (
                        <div key={index}>{subAttribute.label}</div>
                      )
                    )}
                  </div>
                ))}
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

              <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-3">
                <button onClick={() => toggleWishList(user, product)} className="bg-[#FF6F00] text-white p-2 rounded-md hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out">
                  {isWishList ? "بیسڕەوە لە لیستی دڵخوازەکان" : "زیادبکە بۆ لیستی دڵخوازەکان"}
                </button>

                <button onClick={() => addToCart(user, product)} className="bg-[#FF6F00] text-white p-2 rounded-md hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out">زیادبکە بۆ لیستی سەبەتەی کڕین</button>
                
                <button className="bg-[#FF6F00] text-white p-2 rounded-md hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out">داواکردن</button>
              </div>

            </div>
          </div>

          <div className="flex flex-col justify-end items-end gap-3 p-2 w-full">
            <h2 className="text-xl font-semibold border-b border-b-[#e4e4e5] w-full py-2 text-right">بۆچوونەکان</h2>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default ProductPage;
