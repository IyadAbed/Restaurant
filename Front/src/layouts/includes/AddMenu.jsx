/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewItem, getAll } from "../../plugins/redux/reducers/TableReducer";

// import 'dotenv/config'
export const AddMenu = ({ setRefresh, refresh }) => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  // const [bookInfo, setInfo] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   category: "",
  //   ratings: "",
  //   quantity: "",
  //   pages: "",
  //   author: "",
  //   img: "",
  // });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setInfo((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const onSubmit = async (data) => {
    try {
      const res = await dispatch(addNewItem(data));
      if (res.payload?.success) {
        notifySuccess("Item added success");
        console.log("added success", data);
        await dispatch(getAll());
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
        <h1 className="text-[30px] font-bold py-2">Add New MenuItem</h1>
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
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: "name is required" })}
                type="text"
                name="name"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
              />
              {errors?.name && <p className="text-red-600">name is required</p>}
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: "price is required" })}
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
                <span className="label-text">Image</span>
              </label>
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                name="image"
                placeholder="Type here"
                className="input input-sm items-center pb-12 border-[#529b03] w-full max-w-xs"
              />
              {errors?.image && (
                <p className="text-red-600">image is required</p>
              )}
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("discreption", {
                  required: "description is required",
                })}
                name="discreption"
                placeholder="Type here"
                className="input text-sm input-lg  border-[#529b03] w-full max-w-xs"
              />
              {errors?.discreption && (
                <p className="text-red-600">Description is required</p>
              )}
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
