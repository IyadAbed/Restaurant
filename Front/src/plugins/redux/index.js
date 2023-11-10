import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import TableReducer from "./reducers/TableReducer";

const reduxStorePlugin = configureStore({
  reducer: {
    auth: AuthReducer,
    table: TableReducer,
  },
});

export default reduxStorePlugin;
