import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { User, LoginInfo, SessionUser } from "../../types";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
    errors: false,
    loading: false,
  } as SessionUser,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errors = false;
      state.loading = false;
    });

    builder.addCase(restoreUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errors = false;
      state.loading = false;
    });

    builder.addCase(logoutUser.fulfilled, (state, _action) => {
      state.user = null;
      state.errors = false;
      state.loading = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errors = false;
      state.loading = false;
    });
  },
});

export const registerUser = createAsyncThunk(
  "session/register",
  async (credentials: User) => {
    const response = await axios.post("/api/session/register", credentials);
    const { data } = response;
    return data;
  }
);

export const restoreUser = createAsyncThunk("session/restore", async () => {
  const { data } = await axios.post("/api/session/restore");

  return data;
});

export const logoutUser = createAsyncThunk("session/logout", async () => {
  await axios.delete("/api/session/logout");
  return null;
});

export const loginUser = createAsyncThunk(
  "session/login",
  async (credentials: LoginInfo) => {
    const response = await axios.post(
      "/api/session/login",

      credentials
    );
    const { data } = response;
    return data;
  }
);

export default sessionSlice.reducer;
