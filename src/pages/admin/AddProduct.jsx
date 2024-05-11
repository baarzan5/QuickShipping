import React, { useEffect, useId, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductsContext";
import { useCategories } from "../../context/CategoriesContext";
import { useBrands } from "../../context/BrandsContext";
import { useProperties } from "../../context/PropertiesContext";
import Select from "react-select";
import { Helmet } from "react-helmet";
import { IoIosArrowBack } from "react-icons/io";

const AddProduct = () => {
  const { user } = useAuth();
  const { addProduct } = useProducts();
  const { categories, getSubCategories, subCategories } = useCategories();
  const { brands } = useBrands();
  const { colors, attributes, subAttributes } = useProperties();
  const productId = useId();
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState(null);
  const [productSubCategory, setProductSubCategory] = useState(null);
  const [productBrand, setProductBrand] = useState(null);
  const [productColors, setProductColors] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);
  const [productSubAttributes, setProductSubAttributes] = useState([]);
  const [productThumbnailImage, setProductThumbnailImage] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productVideo, setProductVideo] = useState(null);
  const [productPrice, setProductPrice] = useState("");
  const [isFreeShipping, setIsFreeShipping] = useState(true);
  const [isFlatRate, setIsFlatRate] = useState(false);
  const [shippingCost, setShippingCost] = useState("");
  const [shippingDays, setShippingDays] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productDiscountType, setProductDiscountType] = useState("Flat");

  const handleFreeShippingChange = () => {
    setIsFreeShipping(true);
    setIsFlatRate(false);
  };

  const handleFlatRateChange = () => {
    setIsFlatRate(true);
    setIsFreeShipping(false);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const category = categories.find(
      (category) => category.id === selectedCategoryId
    );
    setProductCategory(category);
  };

  useEffect(() => {
    if (productCategory) {
      getSubCategories(productCategory.id);
    }
  }, [productCategory, subCategories]);

  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryId = e.target.value;
    const subCategory = subCategories.find(
      (subCategory) => subCategory.id === selectedSubCategoryId
    );
    setProductSubCategory(subCategory);
  };

  const handleBrandChange = (e) => {
    const selectedBrandId = e.target.value;
    const brand = brands.find((brand) => brand.id === selectedBrandId);
    setProductBrand(brand);
  };

  const handleColorsInputChange = (selectedColors) => {
    setProductColors(selectedColors);
  };

  const handleAttributesInputChange = (selectedAttributes) => {
    const selectedAttributesId = selectedAttributes.map(
      (selectedAttribute) => selectedAttribute.value
    );
    setProductAttributes(selectedAttributesId);
  };

  return (
    <div>
      {user ? (
        <>
          {user.isAdmin ? (
            <div className="flex flex-col justify-start items-start gap-5 w-full p-2">
              <Helmet>
                <title>Barzan DR Shipping | Add Product</title>
              </Helmet>

              <div className="flex justify-start items-center gap-5">
                <button
                  title="Back"
                  onClick={() => history.back()}
                  className="hover:bg-[#969393]/25 rounded-full p-1 transform transition-all ease-in-out duration-100 active:scale-95"
                >
                  <IoIosArrowBack size={27} />
                </button>

                <h2 className="text-2xl font-bold">Add Product</h2>
              </div>

              <div className="grid grid-cols-3 gap-5 w-full">
                <div className="col-span-2 w-full flex flex-col justify-center items-center gap-5">
                  <div className="w-full mainShadow flex flex-col justify-start items-start gap-4 p-2 rounded-md">
                    <h3 className="text-lg font-semibold w-full border-b border-b-[#969393]/25">
                      Product Information
                    </h3>

                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-name`}>
                          Product Name
                        </label>

                        <input
                          type="text"
                          placeholder="Product Name"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          required
                          className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                        />
                      </div>

                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-category`}>
                          Product Category
                        </label>

                        <select
                          value={productCategory ? productCategory.id : ""}
                          onChange={handleCategoryChange}
                          className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                        >
                          <option value="">Product Category</option>

                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {productCategory && (
                        <div className="flex justify-start items-center gap-5 w-full">
                          <label htmlFor={`${productId}-product-sub-category`}>
                            Product Sub Category
                          </label>

                          <select
                            value={
                              productSubCategory ? productSubCategory.id : ""
                            }
                            onChange={handleSubCategoryChange}
                            className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                          >
                            <option value="">Product Sub Category</option>

                            {subCategories.map((subCategory) => (
                              <option
                                key={subCategory.id}
                                value={subCategory.id}
                              >
                                {subCategory.subCategoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-brand`}>
                          Product Brand
                        </label>

                        <select
                          value={productBrand ? productBrand.id : ""}
                          onChange={handleBrandChange}
                          className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                        >
                          <option value="">Product Brand</option>

                          {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand.brandName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mainShadow flex flex-col justify-start items-start gap-4 p-2 rounded-md">
                    <h3 className="text-lg font-semibold w-full border-b border-b-[#969393]/25">
                      Product Images
                    </h3>

                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-thumbnail-image`}>
                          Product Thumbnail Image
                        </label>

                        <input
                          type="file"
                          datatype="image"
                          accept="images/*"
                          onChange={(e) =>
                            setProductThumbnailImage(e.target.files[0])
                          }
                          required
                          className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                        />
                      </div>

                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-gallery-images`}>
                          Product Gallery Images
                        </label>

                        <input
                          type="file"
                          datatype="image"
                          accept="images/*"
                          multiple
                          onChange={(e) => setProductImages(e.target.files)}
                          required
                          className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full mainShadow flex flex-col justify-start items-start gap-4 p-2 rounded-md">
                    <h3 className="text-lg font-semibold w-full border-b border-b-[#969393]/25">
                      Product Videos
                    </h3>

                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-gallery-images`}>
                          Product Video
                        </label>

                        <input
                          type="file"
                          datatype="video"
                          accept="videos/*"
                          multiple
                          onChange={(e) => setProductVideo(e.target.files[0])}
                          required
                          className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full mainShadow flex flex-col justify-start items-start gap-4 p-2 rounded-md">
                    <h3 className="text-lg font-semibold w-full border-b border-b-[#969393]/25">
                      Product Variation
                    </h3>

                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-gallery-images`}>
                          Product Colors
                        </label>

                        <Select
                          options={colors.map((color) => ({
                            value: color.colorCode,
                            colorName: color.colorName,
                            label: (
                              <div className="flex flex-row-reverse justify-between items-center w-full">
                                <div
                                  style={{
                                    backgroundColor: `#${color.colorCode}`,
                                    width: "100px",
                                    height: "20px",
                                    marginRight: "8px",
                                  }}
                                ></div>

                                <span>{color.colorName}</span>
                              </div>
                            ),
                          }))}
                          isMulti={true}
                          value={productColors}
                          onChange={handleColorsInputChange}
                          className="w-[600px] p-2 z-30"
                          placeholder="Select Product Colors"
                        />
                      </div>

                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-gallery-images`}>
                          Product Attributes
                        </label>

                        <Select
                          options={attributes.map((attribute) => ({
                            value: attribute.attributeName,
                            label: (
                              <div className="flex justify-start items-center w-full">
                                <span>{attribute.attributeName}</span>
                              </div>
                            ),
                          }))}
                          isMulti={true}
                          value={productAttributes}
                          onChange={handleAttributesInputChange}
                          className="w-[600px] p-2 z-20"
                          placeholder="Select Product Attributes"
                        />
                      </div>

                      <p className="font-semibold">
                        Choose the attributes of this product and then input
                        values of each attribute
                      </p>
                    </div>
                  </div>

                  <div className="w-full mainShadow flex flex-col justify-start items-start gap-4 p-2 rounded-md">
                    <h3 className="text-lg font-semibold w-full border-b border-b-[#969393]/25">
                      Product Price
                    </h3>

                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-gallery-images`}>
                          Product Price
                        </label>

                        <input
                          type="number"
                          min={1}
                          placeholder="Product Price"
                          value={productPrice}
                          onChange={(e) =>
                            setProductPrice(parseInt(e.target.value))
                          }
                          required
                          className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                        />
                      </div>

                      <div className="flex justify-start items-center gap-5 w-full">
                        <label htmlFor={`${productId}-product-gallery-images`}>
                          Product Discount
                        </label>

                        <input
                          type="number"
                          min={1}
                          placeholder="Product Discount"
                          value={productDiscount}
                          onChange={(e) =>
                            setProductDiscount(parseInt(e.target.value))
                          }
                          required
                          className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                        />

                        <select
                          value={productDiscountType}
                          onChange={(e) =>
                            setProductDiscountType(e.target.value)
                          }
                          className="w-[100px] p-2 border border-[#e4e4e5] rounded-md"
                        >
                          <option value="Flat">Flat</option>
                          <option value="Percent">Percent</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mainShadow flex flex-col justify-start items-start gap-4 p-2 rounded-md">
                    <h3 className="text-lg font-semibold w-full border-b border-b-[#969393]/25">
                      Product Description
                    </h3>

                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex justify-start items-start gap-5 w-full">
                        <label htmlFor={`${productId}-product-gallery-images`}>
                          Product Desctiption
                        </label>

                        <textarea
                          type="text"
                          placeholder="Product Desctiption"
                          value={productDescription}
                          onChange={(e) =>
                            setProductDescription(e.target.value)
                          }
                          required
                          className="w-[600px] p-2 border border-[#e4e4e5] rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-full flex flex-col justify-between items-center">
                  <div className="flex flex-col w-full gap-5">
                    <div className="w-full mainShadow flex flex-col justify-start items-start gap-4 p-2 rounded-md">
                      <h3 className="text-lg font-semibold w-full border-b border-b-[#969393]/25">
                        Shipping Configuration
                      </h3>

                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex justify-between items-center px-2">
                          <p className="font-semibold">Free Shipping</p>

                          <input
                            type="checkbox"
                            checked={isFreeShipping}
                            onChange={handleFreeShippingChange}
                          />
                        </div>

                        <div className="flex flex-col gap-2 justify-center items-center p-2 w-full">
                          <div className="flex justify-between items-center w-full">
                            <p className="font-semibold">Flat Rate</p>

                            <input
                              type="checkbox"
                              checked={isFlatRate}
                              onChange={handleFlatRateChange}
                            />
                          </div>

                          {isFlatRate && (
                            <div className="flex justify-between items-center w-full">
                              <p className="font-semibold">Shipping Cost</p>

                              <input
                                type="number"
                                min={1}
                                placeholder="Shipping Cost"
                                value={shippingCost}
                                onChange={(e) =>
                                  setShippingCost(parseInt(e.target.value))
                                }
                                required
                                className="p-2 border border-[#e4e4e5] rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full mainShadow flex flex-col justify-start items-start gap-4 p-2 rounded-md">
                      <h3 className="text-lg font-semibold w-full border-b border-b-[#969393]/25">
                        Estimate Shipping Time
                      </h3>

                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex justify-between items-center px-2">
                          <p className="font-semibold">Shipping Days</p>

                          <input
                            type="number"
                            placeholder="Shipping Days"
                            min={1}
                            value={shippingDays}
                            onChange={(e) => setShippingDays(e.target.value)}
                            required
                            className="p-2 border border-[#e4e4e5] rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-[150px] bg-[#FF6F00] text-black hover:text-white transform transition-all ease-in-out duration-100 active:scale-95 p-2 rounded-md">
                    Add Product
                  </button>
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
    </div>
  );
};

export default AddProduct;
