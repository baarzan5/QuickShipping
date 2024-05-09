import React from "react";

const Categories = ({ setShowCategories }) => {
  return (
    <div
      onMouseEnter={() => setShowCategories(true)}
      onMouseLeave={() => setShowCategories(false)}
      className="absolute top-8 left-0 w-full bg-[#F5E5D7] flex flex-col justify-end items-end gap-3 px-2"
    >
      <li>منداڵان</li>
      <li>پیاوان</li>
      <li>ئافرەتان</li>
    </div>
  );
};

export default Categories;
