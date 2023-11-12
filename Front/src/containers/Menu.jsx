import { useDispatch, useSelector } from "react-redux";
import { clearItems, getmenu } from "../plugins/redux/reducers/TableReducer";
import MenuItem from "./MenuItem";
import Button from "../components/Button";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Menu() {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const [startBockTable, setStartBockTable] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const menu = useSelector(getmenu);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const holidays = ["2023-11-27", "2023-11-13", "2023-11-16"];
  clearItems;
  return (
    <ul className="mx-auto max-w-3xl divide-y divide-stone-200 px-2">
      <div className="flex justify-between items-center my-3">
        <Button
          type="small"
          onClick={() => {
            setStartBockTable((pre) => !pre);
            setSelectedDate(false);
            dispatch(clearItems());
          }}
        >
          {!startBockTable ? "Bock A Table" : "Cansel"}
        </Button>
        {startBockTable && (
          <DatePicker
            selected={!selectedDate ? currentDate : selectedDate}
            onChange={handleDateChange}
            filterDate={(date) => {
              const formattedDate = date.toISOString().split("T")[0];
              return !holidays.includes(formattedDate);
            }}
            minDate={new Date()}
          />
        )}

        {/* <input
          type="date"
          min={currentDate}
          list="disabledDatesList" // Reference the datalist
          // className="bg-yellow-400 text-stone-800 rounded-full py-2 px-4 focus:outline-none focus:ring focus:ring-yellow-300"
        /> */}
      </div>
      {menu?.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza._id} selectedDate={selectedDate} />
      ))}
    </ul>
  );
}

export default Menu;
