/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

// import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

// import 'dotenv/config'
export const AddMaintenance = ({ setRefresh, refresh }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  console.log("dateRange", dateRange);

  const currentDate = new Date();

  const handleSelect = (ranges) => {
    setDateRange(ranges);
  };
  console.log(dateRange);
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [show, setShow] = useState(false);
  const [bookInfo, setInfo] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ratings: "",
    quantity: "",
    pages: "",
    author: "",
    img: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    console.log("drobi");

    try {
      event.preventDefault();

      const data = await axios.post(
        "http://localhost:8800/addproduct",
        bookInfo
      );
      notifySuccess("book added success");
      setRefresh(!refresh);

      console.log("added success", data.data);
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <>
      <div className="flex items-center gap-5">
        <h1 className="text-[30px] font-bold py-2">Add Maintenance</h1>
        {!show ? (
          <div className="tooltip tooltip-primary" data-tip=" add new book">
            <button
              onClick={handleShow}
              className="btn btn-primary btn-sm btn-circle "
            >
              <IoAddCircleOutline className="text-[20px] font-bold" />
            </button>
          </div>
        ) : (
          <div className="tooltip tooltip-error" data-tip="cancel">
            <button
              onClick={handleShow}
              className="btn btn-error btn-sm btn-circle "
            >
              <MdOutlineCancel className="text-[20px] text-red-600 font-bold" />
            </button>
          </div>
        )}
        <ToastContainer />
      </div>
      {show && (
        <form className="border p-[10px] rounded-lg" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Impact on the Restaurant
              </label>
              <select
                id="countries"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected="">Complete shutdown</option>
                <option value="US">Partial shutdown</option>
                <option value="CA">Normal operations</option>
              </select>
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                name="author"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={bookInfo.author}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                name="description"
                placeholder="Type here"
                className="input text-sm input-lg  border-[#529b03] w-full max-w-xs"
                value={bookInfo.description}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">date</span>
              </label>
              <DemoContainer components={["DateRangePicker"]}>
                <DateRangePicker
                  disablePast={true}
                  localeText={{ start: "Check-in", end: "Check-out" }}
                  onChange={handleSelect}
                />
              </DemoContainer>
              {/* <DateRangePicker
                minDate={currentDate}
                ranges={dateRange}
                onChange={handleSelect}
                showSelectionPreview={false}
              /> */}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label invisible">
                <span className="label-text">button</span>
              </label>
              <button type="submit" className="btn btn-sm btn-primary">
                Add
              </button>
            </div>
            {/*  */}
          </div>
        </form>
      )}
    </>
  );
};
