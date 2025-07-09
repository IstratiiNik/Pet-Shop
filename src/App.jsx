import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import Layout from "./layout/Layout";
import Main from "./pages/Main/Main";
import "./App.css";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
