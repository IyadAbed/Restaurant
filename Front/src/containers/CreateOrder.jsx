import { useState } from "react";
// import { createOrder } from "../../services/apiRestaurant";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearItems,
  getItem,
  getTotalCartPrice,
  getTotalCartQuantity,
} from "../plugins/redux/reducers/TableReducer";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "../plugins/axios";
import Swal from "sweetalert2";
// import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
// import store from "../../store";
// import { formatCurrency } from "../../utils/helpers";
// import { fetchAddress } from "../user/userSlice";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
function CreateOrder({ selectedDate }) {
  const cart = useSelector(getItem);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();
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

  const onSubmit = async (data) => {
    const items = cart.map(({ pizzaId, serveHour, quantity }) => {
      return { id: pizzaId, serveHour, quantity };
    });
    data.serveTime = selectedDate;
    data.items = items;
    data.price = totalCartPrice;
    console.log(data);
    try {
      const datas = await axios.post("addOrder", data);
      if (datas?.data?.success) {
        Swal.fire({
          title: `After you click ok you will receive the booked number please keep it with you we will ask you about it ?`,
          showConfirmButton: true,
          confirmButtonText: "Ok",
          icon: "warning",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire(` your booked num: ${datas.data.success}`, "", "success");
          }
        });
        dispatch(clearItems());
        reset();
      }
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
  };

  if (!totalCartQuantity) return null;

  return (
    <div className=" px-20 py-10">
      <ToastContainer />
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="name"
              // defaultValue={username}

              {...register("name", {
                required: "name is required",
              })}
            />
            {errors?.name && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                name is required
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phoneNumber"
              {...register("phoneNumber", {
                required: "phoneNumber is required",
              })}
            />
            {errors?.phoneNumber && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                phoneNumber is required
              </p>
            )}
          </div>
        </div>

        <div>
          <Button disabled={false} type="primary">
            {/* {isSubmitting
              ? "Placing order...."
              : `Order now from ${formatCurrency(totalPrice)}`} */}
            Order now
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
