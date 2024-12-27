import React from "react";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import ChangeFTP from "./pages/ChangeFTP";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard",
          element: <Upload />,
        },
        {
          path: "/ftp",
          element: <ChangeFTP />,
        },
        {
          path: "/edit",
          element: <EditProfile />,
        },
      ],
    },
  ])
  return (
    <RouterProvider router={router} />
  );
}
