import React from "react";
import { useAuth } from "../context/AuthContext";
import Hero from "../components/Hero";
import NewestProducts from "../components/NewestProducts";
import CategoryProducts from "../components/CategoryProducts";
import Footer from "../components/Footer";

const HomePage = () => {
  const { user, logOutUser } = useAuth();

  return (
    <div className="flex flex-col gap-12 w-full pb-3">
      <Hero />
      <NewestProducts />
      <CategoryProducts />
      <CategoryProducts />
      <CategoryProducts />
      <Footer />
    </div>
  );
};

export default HomePage;
