import React, { useEffect, useState } from "react";
import { useCategories } from "../context/CategoriesContext";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const Categories = ({ setShowCategories }) => {
  const { categories, getSubCategories, subCategories } = useCategories();
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClickCategory = async (category) => {
    setSelectedCategory(category);
    setShowSubCategories(true);
    await getSubCategories(category.id);
  };

  return (
    <div
      onMouseLeave={() => setShowCategories(false)}
      className="absolute top-12 left-0 w-full bg-[#F5E5D7]/95 flex flex-col justify-end items-end gap-3 p-2"
      style={{ zIndex: 999 }}
    >
      {!showSubCategories ? (
        <>
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-row-reverse justify-between items-center w-full"
            >
              <Link
                to={`/category/${category.categorySlug}`}
                onClick={() => setShowCategories(false)}
              >
                {category.categoryName}
              </Link>{" "}
              <button onClick={() => handleClickCategory(category)}>
                <MdOutlineKeyboardArrowLeft size={30} />
              </button>
            </div>
          ))}
        </>
      ) : (
        <>
          {selectedCategory && (
            <>
              <div
                onClick={() => setShowSubCategories(false)}
                className="flex flex-row-reverse justify-between items-center w-full"
              >
                <p>گەڕانەوە</p> <MdOutlineKeyboardArrowLeft size={30} />
              </div>
              {subCategories.map((subCategory, index) => (
                <button
                  key={index}
                  className="flex flex-row-reverse justify-between items-center w-full"
                >
                  <Link to={`/category/${subCategory.subCategorySlug}`}>
                    {subCategory.subCategoryName}
                  </Link>
                </button>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Categories;
