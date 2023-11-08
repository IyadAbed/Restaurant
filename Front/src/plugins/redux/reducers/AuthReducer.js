import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Buffer } from "buffer";

const getJwtData = (token) => {
  const jwt = token.split(".");
  return JSON.parse(Buffer.from(jwt[1], "base64").toString());
};

const getSession = () => {
  const session = {
    auth: false,
    currentUser: null,
    token: null,
  };

  const localStorageSession = localStorage.getItem("session");
  if (!localStorageSession) return session;

  return {
    auth: true,
    currentUser: getJwtData(localStorageSession),
    token: localStorageSession,
  };
};

const initialState = getSession();

export const login = createAsyncThunk("auth/login", async (loginFrom) => {
  try {
    const { data } = await axios.post("login", loginFrom);
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data.message;
  }
});

export const registers = createAsyncThunk("auth/register", async (data) => {
  console.log("register", data);
  try {
    const { data } = axios.post("register", data);
    return data;
  } catch (error) {
    return error.response.data.error;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("session");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      return state;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (typeof action.payload == "object" && action.payload.success) {
        const token = action.payload.success;
        const currentUser = getJwtData(token);
        state.auth = !!token;
        state.currentUser = currentUser;
        state.token = token;
        localStorage.setItem("session", token);
      }
      return state;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("rejected");
      return action.error;
    });

    builder.addCase(registers.pending, (state) => {
      return state;
    });
    builder.addCase(registers.fulfilled, (state, action) => {
      if (typeof action.payload == "object") {
        const token = action.payload.success.token;
        const currentUser = getJwtData(token);
        state.auth = true;
        state.currentUser = currentUser;
        state.token = token;
        localStorage.setItem("session", token);
      }
      return state;
    });
    builder.addCase(registers.rejected, (state) => {
      return state;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.auth = false;
      state.currentUser = null;
      state.token = null;
    });
  },
});

export const authActions = authSlice.actions;

export const authSelector = (state) => state.auth;
export const currentUserSelector = (state) => state.auth?.currentUser;

export default authSlice.reducer;
