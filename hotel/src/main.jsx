import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/montserrat"; // Default weight 400
import "@fontsource/montserrat/600.css"; // Bold weight 600
import { createHashRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";

// Router setup
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      // add your other routes
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
