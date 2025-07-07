import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import Layout from "./layout/Layout";
import Main from "./pages/Main/Main";
import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={ROUTES.MAIN} element={<Main />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
