import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  items: [],
  menu: [],
  status: "idle" | "loading" | "error",
};

export const getAll = createAsyncThunk("getAll/menu", async () => {
  try {
    const { data } = await axios.get("getAll");
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data.message;
  }
});
// {
//   items: [],
//   menu: [],

//   // cart: [
//   //   {
//   //     pizzaId: 12,
//   //     name: 'Mediterranean',
//   //     quantity: 2,
//   //     unitPrice: 16,
//   //     totalPrice: 32,
//   //   },
//   // ],
// };

export const addNewOrder = createAsyncThunk("order/menu", async (order) => {
  try {
    const { data } = await axios.post("addOrder", order);
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data.message;
  }
});

const tableSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.items.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.items = state.items.filter(
        (item) => item.pizzaId !== action.payload
      );
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.items.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.items.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.price;

      if (item.quantity === 0)
        tableSlice.caseReducers.deleteItem(state, action);
    },
    clearItems(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state) => {
      state.status = "loading";
      return state;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      if (typeof action.payload == "object" && action.payload.success) {
        state.menu = action.payload.success;
        state.status = "idle";
      }
      return state;
    });
    builder.addCase(getAll.rejected, (state) => {
      state.status = "error";
      return state;
    });
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearItems,
} = tableSlice.actions;

export default tableSlice.reducer;

export const getItem = (state) => state.table.items;
export const getmenu = (state) => state.table.menu;

export const getTotalCartQuantity = (state) =>
  state.table.items.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.table.items.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.table.items.find((item) => item.pizzaId === id)?.quantity ?? 0;

// 'reselect'
