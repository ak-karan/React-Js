import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Man from "./components/Man/Man.jsx";   // ✅ FIXED: proper Man import
import "./components/component/i18n.js";     // ✅ keep i18n import (must be after react imports)

// Router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="man" element={<Man />} />
      {/* other routes */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
