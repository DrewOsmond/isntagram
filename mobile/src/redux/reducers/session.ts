import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

interface Config {
  body: {
    [key: string]: any;
  };
  headers: {
    [key: string]: string;
  };
}

interface User {
  username: string;
  email: string;
  password: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface ReduxUser {
  user: User | null;
  errors: boolean;
  loading: boolean;
}

const saveToken = async (jwt: string) => {
  await SecureStore.setItemAsync("token", jwt);
};

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
    errors: false,
    loading: false,
  } as ReduxUser,
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

    builder.addCase(logoutUser.fulfilled, (state, action) => {
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
    const response = await axios.post(
      "http://localhost:4000/api/session/register",
      credentials
    );
    const { data } = response;
    const token = response.request.responseHeaders["Set-Cookie"]
      .split(";")[0]
      .slice(6);
    await saveToken(token);
    return data;
  }
);

export const restoreUser = createAsyncThunk("session/restore", async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    const { data } = await axios.post(
      "http://localhost:4000/api/session/restore",
      {
        Headers: {
          authorization: token,
        },
      }
    );

    return data;
  }
});

export const logoutUser = createAsyncThunk("session/logout", async () => {
  const { data } = await axios.delete(
    "http://localhost:4000/api/session/logout"
  );
  await SecureStore.deleteItemAsync("token");
  return null;
});

export const loginUser = createAsyncThunk(
  "session/login",
  async (credentials: LoginInfo) => {
    const response = await axios.post(
      "http://localhost:4000/api/session/login",

      credentials
    );
    const { data } = response;
    const token = response.request.responseHeaders["Set-Cookie"]
      .split(";")[0]
      .slice(6);
    await saveToken(token);
    return data;
  }
);

export default sessionSlice.reducer;
