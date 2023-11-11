import { Routes, Route } from "react-router-dom";
import Errors from "./components/Error";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "./plugins/redux/reducers/TableReducer";
import routes from "./Routes";
import { currentUserSelector } from "./plugins/redux/reducers/AuthReducer";

function App() {
  const dispatch = useDispatch();
  dispatch(getAll());
  const currentUser = useSelector(currentUserSelector);
  console.log("currentUser", currentUser.role);
  return (
    <>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              element={route.element}
              path={route.path}
              key={"layout-" + index}
            >
              {route.children?.map((child, index) => {
                if (child.allowedRoles) {
                  console.log("imfipsfmsmfklsmflksf", child.allowedRoles);
                  return child.allowedRoles &&
                    child.allowedRoles.includes(currentUser?.role) ? (
                    <Route
                      path={child.path}
                      element={child.element}
                      key={"child-" + index}
                    />
                  ) : (
                    <Route
                      path={child.path}
                      element={<Errors />}
                      key={"child-" + index}
                    />
                  );
                } else {
                  return (
                    <Route
                      path={child.path}
                      element={child.element}
                      key={"route-" + index}
                    />
                  );
                }
              })}
            </Route>
          );
        })}
        <Route path="*" element={<Errors />} />
      </Routes>
    </>
  );
}

export default App;
