import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Lander from "./Lander";
import About from "./About";
import Mokkogen from "./Mokkogen";
import ManageNotes from './ManageNotes'
import ManageMokkos from './ManageMokkos'
import ManageSettings from './ManageSettings'

import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: rootLoader,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Lander />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "mokkogen",
        element: <Mokkogen />,
      },
      {
        path: "manage/notes",
        element: < ManageNotes/>,
      },
      {
        path: "manage/mokkos",
        element: <ManageMokkos />,
      },
      {
        path: "manage/settings",
        element: <ManageSettings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
