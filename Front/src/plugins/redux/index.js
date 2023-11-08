import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";

const reduxStorePlugin = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default reduxStorePlugin;
