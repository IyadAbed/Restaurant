import { useDispatch, useSelector } from "react-redux";
import { clearItems, getmenu } from "../plugins/redux/reducers/TableReducer";
import MenuItem from "./MenuItem";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../plugins/axios";

function Menu({ selectedDate, setSelectedDate }) {
  const [blockedDate, setBlockedDate] = useState([]);
  const currentDate = new Date();
  const dispatch = useDispatch();
  const [startBockTable, setStartBockTable] = useState(false);

  const menu = useSelector(getmenu);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    (async () => {
      try {
        const datas = await axios.get("getLastMaintenance");
        if (datas?.data?.success) {
          setBlockedDate(datas.data.success.closeDates);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);
  return (
    <ul className="px-20 py-10 divide-y divide-stone-200 ">
      <div className="flex justify-between items-center my-3">
        <Button
          type="small"
          onClick={() => {
            setStartBockTable((pre) => !pre);
            setSelectedDate(false);
            dispatch(clearItems());
          }}
        >
          {!startBockTable ? "Bock A Table" : "Cancel"}
        </Button>
        {startBockTable && (
          <DatePicker
            selected={!selectedDate ? currentDate : selectedDate}
            onChange={handleDateChange}
            filterDate={(date) => {
              const formattedDate = new Date(date).toISOString();
              return !(
                formattedDate >= blockedDate[0] &&
                formattedDate < blockedDate[1]
              );
              // return !holidays.includes(formattedDate);
            }}
            minDate={new Date()}
          />
        )}
      </div>

      <div className="tab-pane fade show p-0 active">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-x-20">
          {menu?.map((pizza) => (
            <MenuItem
              pizza={pizza}
              selectedDate={selectedDate}
              key={pizza._id}
            />
          ))}
        </div>
      </div>
    </ul>
  );
}

export default Menu;
