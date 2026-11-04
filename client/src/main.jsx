import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import About from "./pages/About";

// Nested routes: Layout is the parent, pages swap inside its Outlet
const router = createBrowserRouter([
{
path: "/",
element: <Layout />,
children: [
{ index: true, element: <Home /> },
{ path: "menu", element: <Menu /> },
{ path: "booking", element: <Booking /> },
{ path: "about", element: <About /> },
],
},
]);

createRoot(document.getElementById("root")).render(
<StrictMode>
<RouterProvider router={router} />
</StrictMode>
);