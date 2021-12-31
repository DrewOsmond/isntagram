import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

interface Config {
  body: {
    [key: string]: any;
  };
  headers: {
    [key: string]: string;
  };
}

// async function _fetch(url: string, config?: Config) {
//   let token;
//   try {
//     token = await SecureStore.getItemAsync("token");

//     const body = (config && config.body) || null;
//     const headers = (config && config.headers) || {};

//     const configObject = {
//       ...config,
//       credentails: "omit",
//       headers: {
//         ...headers,
//         "X-Requested-With": "app",
//         "X-Access-Token": String(token),
//         Cookie: null,
//       },
//       body: JSON.stringify(body),
//     };
//     const data = await fetch(url, configObject);
//   } catch (error) {}
// }

const saveToken = async (jwt: string) => {
  await SecureStore.setItemAsync("token", jwt);
};

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
    errors: false,
    loading: false,
  },
  reducers: {},
  extraReducers: {},
});

export const registerUser = createAsyncThunk(
  "session/register",
  async (credentials) => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      return;
    }
    // const data = await _fetch("http://localhost:4000/api");
    const data = await fetch("http://localhost:4000/api", {
      headers: {
        "X-Requested-With": "app",
        "X-Access-Token": token!,
      },
    });
  }
);

export default sessionSlice.reducer;
