import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Main } from "./pages/Main/main";
import { Catalog } from "./pages/Catalog/catalog";
import { Auth } from "./pages/Auth/auth";
import { User } from "./pages/User/user";
import { CurrentCard } from "./components/ProductCard/productcard";
import { Error } from "./pages/404/404";
import { Cart } from "./pages/Cart/cart";
import { Favorites } from "./pages/Favorites/favorites";
import { AddProduct } from "./pages/AddProduct/addproduct";
import { Settings } from "./pages/Settings/settings";
import { Orders } from "./pages/Orders/orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "product/:productId",
        element: <CurrentCard />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
