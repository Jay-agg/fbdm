import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Login from "./Login";
import FbLogin from "./FbLogin";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/connect",
      element: <FbLogin />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter}>
        <Outlet />
      </RouterProvider>
    </div>
  );
};

export default Body;
