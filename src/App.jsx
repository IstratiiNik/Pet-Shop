import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import Layout from "./layout/Layout";
import Main from "./pages/Main/Main";
import "./App.css";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import AllSalesPage from "./pages/AllSalesPage/AllSalesPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.SALES} element={<AllSalesPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
