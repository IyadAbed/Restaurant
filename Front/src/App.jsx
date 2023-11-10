import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { getAll } from "./plugins/redux/reducers/TableReducer";

function App() {
  const dispatch = useDispatch();
  dispatch(getAll());
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route />
    <Route /> */}
      </Routes>
    </>
  );
}

export default App;
