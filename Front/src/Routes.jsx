import MenuTable from "./layouts/includes/MenuTable";
import Errors from "./components/Error";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MaintenanceTable from "./layouts/includes/MaintenanceTable";
import Order from "./layouts/includes/Order";

const routes = [
  {
    element: <AppLayout />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    path: "/admin",
    children: [
      {
        path: "/admin/Menu",
        element: <MenuTable />,
        allowedRoles: [1, 2],
      },
      {
        path: "/admin/Maintenance",
        element: <MaintenanceTable />,
        allowedRoles: [1, 2],
      },
      {
        path: "/admin/Order",
        element: <Order />,
        allowedRoles: [1, 2],
      },
    ],
  },
];

export default routes;
