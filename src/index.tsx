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
        path: "product/:productId",
        element: <CurrentCard />,
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
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

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
