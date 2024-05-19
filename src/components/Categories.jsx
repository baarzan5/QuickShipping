import React, { useEffect, useState } from "react";
import { useCategories } from "../context/CategoriesContext";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const Categories = ({ setShowCategories }) => {
  const { categories } = useCategories();

  return (
    <div
      onMouseLeave={() => setShowCategories(false)}
      className="absolute top-14 left-0 w-full bg-[#F5E5D7]/95 flex flex-col justify-end items-end gap-3 p-2"
      style={{ zIndex: 999 }}
    >
        <>
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-row-reverse justify-start items-center w-full"
            >
              <Link
                to={`/category/${category.categorySlug}`}
                onClick={() => setShowCategories(false)}
              >
                {category.categoryName}
              </Link>
            </div>
          ))}
        </>
    </div>
  );
};

export default Categories;
