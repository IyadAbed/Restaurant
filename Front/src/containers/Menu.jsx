import { useSelector } from "react-redux";
import { getmenu } from "../plugins/redux/reducers/TableReducer";
import MenuItem from "./MenuItem";
import Button from "../components/Button";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Menu() {
  const menu = useSelector(getmenu);
  console.log(menu);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  console.log("selectedDate", selectedDate);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const holidays = ["2023-11-27", "2023-11-13", "2023-11-16"];

  return (
    <ul className="mx-auto max-w-3xl divide-y divide-stone-200 px-2">
      <div className="flex justify-between items-center my-3">
        <Button type="small">Bock A Table</Button>

        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={(date) => {
            const formattedDate = date.toISOString().split("T")[0];
            return !holidays.includes(formattedDate);
          }}
        />

        {/* <input
          type="date"
          min={currentDate}
          list="disabledDatesList" // Reference the datalist
          // className="bg-yellow-400 text-stone-800 rounded-full py-2 px-4 focus:outline-none focus:ring focus:ring-yellow-300"
        /> */}
      </div>
      {menu?.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza._id} />
      ))}
    </ul>
  );
}

export default Menu;
