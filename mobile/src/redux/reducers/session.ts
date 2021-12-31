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

const saveToken = async (jwt: string) => {
  await SecureStore.setItemAsync("token", jwt);
};

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    return SecureStore;
  } else {
    return null;
  }
};

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
    errors: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, payload) => {
      console.log("PAYLOADDDDL", payload);
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
  const token = await getToken();
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

export default sessionSlice.reducer;

// axios.request({
//   method: 'POST',
//   url: `http://localhost:4444/next/api`,
//   headers: {
//     'Authorization': token
//   },
//   data: {
//     next_swastik: 'lets add something here'
//   },

// })
