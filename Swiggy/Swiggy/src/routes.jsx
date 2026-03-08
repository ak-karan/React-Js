import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import Vges from "./components/Vges";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Banner from "./components/Banner";
import ErrorPage from "./ErrorPage.jsx";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Banner />} />
      <Route path="product" element={<Product />} />
      <Route path="cart" element={<Cart />} />
    </Route>
  )
);

export default router;
