import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  currentUserSelector,
  logout,
} from "../plugins/redux/reducers/AuthReducer";
// import Username from "../features/user/Username";

function Header() {
  const isLog = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      {isLog ? (
        <Link
          to="/"
          onClick={() => {
            dispatch(logout());
          }}
          className="tracking-widest"
        >
          LogOut
        </Link>
      ) : (
        <Link to="/login" className="tracking-widest">
          Login
        </Link>
      )}

      {/* <Username /> */}
    </header>
  );
}

export default Header;
