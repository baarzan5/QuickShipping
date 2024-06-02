import React, { Suspense, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { Link, useParams } from "react-router-dom";
import { FormatMoney } from "../utils/FormatMoney";
import { IoIosAdd } from "react-icons/io";
import { CgMathMinus } from "react-icons/cg";
import { useOrders } from "../context/OrdersContext";
import { ORDERSACTIONS } from "../actions/ordersActions";
import AddToCartModal from "../components/modals/AddToCartModal";
import UserAddressModal from "../components/modals/UserAddressModal";
import { useReviews } from "../context/ReviewsContext";

const ProductPage = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const { products, getUserWishLists, wishLists, toggleWishList, addToCart } =
    useProducts();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showUserAddressModal, setShowUserAddressModal] = useState(false);
  const { reviews } = useReviews();
  const [selectedProductAttributes, setSelectedProductAttributes] = useState(
    () => {
      return product && product.productAttributes
        ? product.productAttributes.map((attr) =>
            attr.subAttributes.length > 0 ? attr.subAttributes[0].label : ""
          )
        : [];
    }
  );

  const getProduct = () => {
    const foundProduct = products.find((product) => product.id == productId);
    setProduct(foundProduct);
  };

  useEffect(() => {
    getProduct();
  }, [products, productId]);

  useEffect(() => {
    if (user) {
      getUserWishLists(user);
    }
  }, [user]);

  const isWishList = wishLists.some(
    (wishList) => wishList.product.id == product?.id
  );

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

  const handleAttributeChange = (attributeIndex, subAttributeLabel) => {
    const updatedAttributes = [...selectedProductAttributes];
    updatedAttributes[attributeIndex] = subAttributeLabel;
    setSelectedProductAttributes(updatedAttributes);
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
                          کۆی گشتی نرخ :{" "}
                          {FormatMoney(
                            quantity * product.productPrice -
                              product.productDiscount
                          )}{" "}
                          IQD
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
                    <p className="text-xl">
                      {FormatMoney(product.productPrice)}
                    </p>
                    <p>
                      کۆی گستی نرخ :{" "}
                      {FormatMoney(quantity * product.productPrice)} IQD
                    </p>
                  </div>
                )}{" "}
                IQD : نرخ
              </div>
              <p className="flex justify-center items-center gap-2">
                {product.productColors.map((color, index) => (
                  <span
                    key={index}
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

              <div className="flex flex-col justify-end items-end gap-4">
                {product.productAttributes.map((productAttribute, index) => (
                  <div
                    key={index}
                    className="flex flex-row-reverse justify-center items-center gap-2"
                  >
                    <span>: {productAttribute.attributeName}</span>
                    <div className="flex justify-center items-center gap-2">
                      {productAttribute.subAttributes.map(
                        (subAttribute, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={() =>
                              handleAttributeChange(index, subAttribute.label)
                            }
                            className={`p-1 border rounded-md ${
                              selectedProductAttributes[index] ===
                              subAttribute.label
                                ? "bg-[#FF6F00] text-white"
                                : "bg-white text-black"
                            }`}
                          >
                            {subAttribute.label}
                          </button>
                        )
                      )}
                    </div>
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
                <p>: بڕ</p>
              </div>

              <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-3">
                <button
                  onClick={() =>
                    user
                      ? toggleWishList(user, product)
                      : alert("تکایە سەرەتا بچۆ ژووەرەوە")
                  }
                  className="bg-[#FF6F00] text-white p-2 rounded-md hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  {isWishList
                    ? "بیسڕەوە لە لیستی دڵخوازەکان"
                    : "زیادبکە بۆ لیستی دڵخوازەکان"}
                </button>

                <button
                  onClick={() =>
                    user
                      ? setShowAddToCartModal(!showAddToCartModal)
                      : alert("تکایە سەرەتا بچۆ ژوورەوە")
                  }
                  className="bg-[#FF6F00] text-white p-2 rounded-md hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  زیادبکە بۆ سەبەتەی کڕین
                </button>

                {showAddToCartModal && (
                  <AddToCartModal
                    showAddToCartModal={showAddToCartModal}
                    setShowAddToCartModal={setShowAddToCartModal}
                    product={product}
                  />
                )}

                <button
                  onClick={() =>
                    user
                      ? setShowUserAddressModal(!showUserAddressModal)
                      : alert("تکایە سەرەتا بچۆ ژوورەوە")
                  }
                  className="bg-[#FF6F00] text-white p-2 rounded-md hover:bg-[#FF6F00]/90 active:scale-95 transform transition-all duration-100 ease-in-out"
                >
                  داواکردن
                </button>

                {showUserAddressModal && (
                  <UserAddressModal
                    showUserAddressModal={showUserAddressModal}
                    setShowUserAddressModal={setShowUserAddressModal}
                    user={user}
                    cart={[
                      {
                        product,
                        selectedProductAttributes,
                        totalPrice,
                        quantity: 1,
                      },
                    ]}
                    orderNote={""}
                    totalMoney={totalPrice}
                    isFromCart={false}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end items-end gap-3 p-2 w-full">
            <h2 className="text-xl font-semibold border-b border-b-[#e4e4e5] w-full py-2 text-right">
              بۆچوونەکان
            </h2>

            <div className="flex flex-row-reverse flex-wrap justify-end items-end gap-4">
              {reviews
                .filter((review) => review.productId == product.id)
                .map((review, index) => (
                  <div key={index}>{review.reviewText}</div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default ProductPage;
