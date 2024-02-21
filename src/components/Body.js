import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Login from "./Login";
import FbLogin from "./FbLogin";
import AgentScreen from "./AgentScreen";

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
    {
      path: "/client/Agent/user",
      element: <AgentScreen />,
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
