import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SignUpPage from "./pages/auth/SignUpPage";
import AdminPage from "./pages/admin/AdminPage";
import Header from "./components/Header";
import CategoriesPage from "./pages/admin/CategoriesPage";
import CategoryPage from "./pages/admin/CategoryPage";
import ProductsPage from "./pages/admin/ProductsPage";
import AddProduct from "./pages/admin/AddProduct";
import BrandsPage from "./pages/admin/BrandsPage";
import PropertiesPage from "./pages/admin/PropertiesPage";
import { BrandsProvider } from "./context/BrandsContext";
import { PropertiesProvider } from "./context/PropertiesContext";
import { ProductsProvider } from "./context/ProductsContext";
import AdminProductPage from "./pages/admin/AdminProductPage";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import AddBalancePage from "./pages/AddBalancePage";
import MyWishListsPage from "./pages/MyWishListsPage";
import { OrdersProvider } from "./context/OrdersContext";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AddressPage from "./pages/AddressPage";
import { LocationsProvider } from "./context/LocationsContext";
import LocationsPage from "./pages/admin/LocationsPage";
import CountryPage from "./pages/admin/CountryPage";
import MyOrdersPage from "./pages/MyOrdersPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CategoriesProvider>
          <BrandsProvider>
            <PropertiesProvider>
              <ProductsProvider>
                <OrdersProvider>
                  <LocationsProvider>
                    <Header />
                    <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route path="/signup" element={<SignUpPage />} />

                      <Route path="/" element={<HomePage />} />
                      <Route
                        path="/category/:categorySlug"
                        element={<ProductCategoryPage />}
                      />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/add-balance" element={<AddBalancePage />} />
                      <Route path="/wishlists" element={<MyWishListsPage />} />
                      <Route
                        path="/product/:productId"
                        element={<ProductPage />}
                      />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/address" element={<AddressPage />} />
                      <Route path="/orders" element={<MyOrdersPage />} />

                      {/* Admin Panel */}
                      <Route path="/admin/home" element={<AdminPage />} />
                      <Route
                        path="/admin/categories"
                        element={<CategoriesPage />}
                      />
                      <Route
                        path="/admin/category/:categorySlug"
                        element={<CategoryPage />}
                      />
                      <Route
                        path="/admin/products"
                        element={<ProductsPage />}
                      />
                      <Route
                        path="/admin/add-product"
                        element={<AddProduct />}
                      />
                      <Route path="/admin/brands" element={<BrandsPage />} />
                      <Route
                        path="/admin/properties"
                        element={<PropertiesPage />}
                      />
                      <Route
                        excat
                        path="/admin/product/:productId"
                        element={<AdminProductPage />}
                      />
                      <Route
                        excat
                        path="/admin/locations"
                        element={<LocationsPage />}
                      />
                      <Route
                        excat
                        path="/admin/country/:countryId"
                        element={<CountryPage />}
                      />
                    </Routes>
                    <Footer />
                  </LocationsProvider>
                </OrdersProvider>
              </ProductsProvider>
            </PropertiesProvider>
          </BrandsProvider>
        </CategoriesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
