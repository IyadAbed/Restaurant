import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import DeleteItem from "../components/DeleteItem";
import UpdateQuantity from "../components/UpdateQuantity";
import { TimePicker } from "react-ios-time-picker";
// import { formatCurrency } from "../../utils/helpers";
import {
  addItem,
  getCurrentQuantityById,
  getItem,
} from "../plugins/redux/reducers/TableReducer";
import { useState } from "react";

function MenuItem({ pizza, selectedDate }) {
  const dispatch = useDispatch();
  console.log(pizza);
  const { _id: id, name, price, discreption, soldOut, image } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      price,
      totalPrice: price * 1,
    };
    dispatch(addItem(newItem));
  }
  const [value, setValue] = useState("10:00");

  const onChange = (timeValue) => {
    setValue(timeValue);
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={image}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm capitalize italic text-stone-500">
              {discreption}
            </p>
          </div>
          <p className="text-sm mr-4">${price}</p>
        </div>
        <div className="mt-auto flex items-center justify-end">
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <TimePicker
                onChange={onChange}
                value={value}
                popupClassName="flex justify-center items-center"
              />
              <UpdateQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {selectedDate && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
