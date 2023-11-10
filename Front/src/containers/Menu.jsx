import { useSelector } from "react-redux";
import { getmenu } from "../plugins/redux/reducers/TableReducer";
import MenuItem from "./MenuItem";
function Menu() {
  const menu = useSelector(getmenu);
  console.log(menu);
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu?.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza._id} />
      ))}
    </ul>
  );
}

export default Menu;
