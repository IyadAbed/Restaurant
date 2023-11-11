import Errors from "./components/Error";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const routes = [
  {
    element: <AppLayout />,
    path: "/",
    children: [
      {
        path: "/home",
        element: <Home />,
        allowedRoles: [3, 2],
      },
      {
        path: "/login",
        element: <Login />,
        allowedRoles: [3, 2],
      },
      {
        path: "/register",
        element: <Register />,
        allowedRoles: [3, 2],
      },
    ],
  },
  {
    element: <AdminLayout />,
    path: "/",
    children: [
      {
        path: "/lop",
        element: <Login />,
        allowedRoles: [1, 2],
      },
      {
        path: "/ho",
        element: <Errors />,
        allowedRoles: [1, 2],
      },
      {
        path: "/go",
        element: <Register />,
        allowedRoles: [1, 2],
      },
    ],
  },
];

export default routes;
