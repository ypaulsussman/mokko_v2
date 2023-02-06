import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import ErrorPage from "./ErrorPage";
import Lander from "./Lander";
import About from "./About";
import Mokkogen from "./Mokkogen";
import ManageNotes from "./ManageNotes";
import NewNote from "./NewNote";
import NoteDetail from "./NoteDetail";
import EditNote from "./EditNote";
import ManageMokkos from "./ManageMokkos";
import NewMokko from "./NewMokko";
import MokkoDetail from "./MokkoDetail";
import EditMokko from "./EditMokko";
import ManageSettings from "./ManageSettings";

import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        children: [
          { index: true, element: <ManageNotes /> },
          {
            path: "new",
            element: <NewNote />,
          },
          {
            path: ":noteId",
            children: [
              { index: true, element: <NoteDetail /> },
              {
                path: "newMokko",
                element: <NewMokko />,
              },
            ],
          },
          {
            path: ":noteId/edit",
            element: <EditNote />,
          },
        ],
      },
      {
        path: "manage/mokkos",
        children: [
          { index: true, element: <ManageMokkos /> },
          {
            path: ":mokkoId",
            element: <MokkoDetail />,
          },
          {
            path: ":mokkoId/edit",
            element: <EditMokko />,
          },
        ],
      },
      {
        path: "manage/settings",
        element: <ManageSettings />,
      },
      {
        path: "*",
        element: <Lander />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
