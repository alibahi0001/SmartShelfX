import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterPage from "./Components/LoginComponent/RegisterPage";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import ManagerMenu from "./Components/LoginComponent/ManagerMenu";
import VendorMenu from "./Components/LoginComponent/VendorMenu";
import SKUReport from "./Components/SKUComponent/SKUReport";
import SKUEntry from "./Components/SKUComponent/SKUEntry";
import SKUEdit from "./Components/SKUComponent/SKUEdit";
import ProductEntry from "./Components/ProductComponent/ProductEntry";
import ProductReport from "./Components/ProductComponent/ProductReport";
import ProductPriceEdit from "./Components/ProductComponent/ProductPriceEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminMenu />} />
        <Route path="/manager" element={<ManagerMenu />} />
        <Route path="/vendor" element={<VendorMenu />} />
        <Route path="/sku-list" element={<SKUReport />} />
        <Route path="/sku-addition" element={<SKUEntry />} />
        <Route path="/sku-edit/:id" element={<SKUEdit />} />
        <Route path="/product-entry" element={<ProductEntry />} />
        <Route path="/product-list" element={<ProductReport />} />
        <Route path="/edit-price/:pid" element={<ProductPriceEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
