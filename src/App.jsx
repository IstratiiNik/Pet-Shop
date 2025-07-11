import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import Layout from "./layout/Layout";
import Main from "./pages/Main/Main";
import "./App.css";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import AllSalesPage from "./pages/AllSalesPage/AllSalesPage";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage";
import CartPage from "./pages/CartPage/CartPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
          <Route path={ROUTES.SALES} element={<AllSalesPage />} />
          <Route path={ROUTES.PRODUCTS} element={<AllProductsPage />} />
          <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
			 <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
