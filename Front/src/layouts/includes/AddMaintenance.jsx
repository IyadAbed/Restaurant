/* eslint-disable react/prop-types */
import axios from "../../plugins/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
export const AddMaintenance = () => {
  const [dateRange, setDateRange] = useState([]);
  console.log("dateRange", dateRange[0]?.["$d"]);

  const currentDate = new Date();

  const handleSelect = (ranges) => {
    setDateRange(ranges);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    try {
      data.closeDates = dateRange.map((element) => {
        return element?.["$d"];
      });
      const datas = await axios.post("addMaintenance", data);
      if (datas?.data?.success) {
        notifySuccess("book added success");
        reset();
      }
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
          <div className="tooltip tooltip-primary" data-tip="">
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
        <form
          className="border p-[10px] rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                {...register("impact", { required: "required" })}
                name="impact"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Complete shutdown">Complete shutdown</option>
                <option value="Partial shutdown">Partial shutdown</option>
                <option value="Normal operations">Normal operations</option>
              </select>
              {errors?.impact && (
                <p className="text-red-600">impact is required</p>
              )}
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: "required" })}
                type="text"
                name="price"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
              />
              {errors?.price && (
                <p className="text-red-600">price is required</p>
              )}
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                {...register("comment", { required: "required" })}
                name="comment"
                placeholder="Type here"
                className="input text-sm input-lg  border-[#529b03] w-full max-w-xs"
              />
              {errors?.comment && (
                <p className="text-red-600">email is required</p>
              )}
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
