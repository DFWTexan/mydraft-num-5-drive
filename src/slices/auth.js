import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data));
      return response.data;
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      let message = {
        status: "ERROR",
        message: "An error occurred.",
      };

      message = {
        ...message,
        status: error.response.data.status,
        message: error.response.data.message,
      };
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const registerV2 = createAsyncThunk(
  "auth/registerV2",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.registerV2(username, email, password);
      thunkAPI.dispatch(setMessage(response.data));
      return response.data;
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      let message = {
        status: "ERROR",
        message: "An error occurred.",
      };

      message = {
        ...message,
        status: error.response.data.status,
        message: error.response.data.message,
      };
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);

      localStorage.setItem("user", JSON.stringify(data)); // Store the user in localStorage
      return { user: data };
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      let message = {
        status: "ERROR",
        message: "An error occurred.",
      };

      // Check for the specific structure of the error response and update the message object accordingly
      if (error.response && error.response.data) {
        message = {
          ...message,
          status: error.response.data.status || "Error",
          message:
            error.response.data.message || "Username or password is incorrect.",
        };
      } else {
        message = {
          ...message,
          message: error.message || error.toString(),
        };
      }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const loginV2 = createAsyncThunk(
  "auth/loginV2",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.loginV2(email, password);

      localStorage.setItem("user", JSON.stringify(data)); // Store the user in localStorage
      return { user: data };
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      let message = {
        status: "ERROR",
        message: "An error occurred.",
      };

      // Check for the specific structure of the error response and update the message object accordingly
      if (error.response && error.response.data) {
        message = {
          ...message,
          status: error.response.data.status || "Error",
          message:
            error.response.data.message || "Username or password is incorrect.",
        };
      } else {
        message = {
          ...message,
          message: error.message || error.toString(),
        };
      }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const emailCodeConfirmation = createAsyncThunk(
  "auth/EmailCodeConfirmation",
  async ({ email, code }, thunkAPI) => {
    try {
      const data = await AuthService.emailCodeConfirmation(email, code);

      localStorage.setItem("user", JSON.stringify(data)); // Store the user in localStorage
      return { user: data };
    } catch (error) {
      let message = {
        status: "ERROR",
        message: "An error occurred.",
      };

      // Check for the specific structure of the error response and update the message object accordingly
      if (error.response && error.response.data) {
        message = {
          ...message,
          status: error.response.data.status || "Error",
          message:
            error.response.data.message || "Username or password is incorrect.",
        };
      } else {
        message = {
          ...message,
          message: error.message || error.toString(),
        };
      }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
