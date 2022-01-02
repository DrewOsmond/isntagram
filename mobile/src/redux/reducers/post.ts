import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

interface NewPost {
  image: FormData;
  content: string;
  username: string;
}

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ image, content, username }: NewPost) => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) return;

    const form = new FormData();
    form.append("photo", {
      //@ts-ignore
      name: `${username}-${new Date()}`,
      uri: image,
      type: `image/jpg`,
    });
    const { data } = await axios.post(
      "http://localhost:4000/api/posts/upload",
      form,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: token,
        },
      }
    );

    console.log(data);
  }
);

// const upload = async () => {
//     let res = await fetch("http://localhost/", {
//       method: "post",
//       body: image,
//       headers: {
//         "Content-Type": "multipart/form-data; ",
//       },
//     });
//     let responseJson = await res.json();
//   };

export default postSlice.reducer;
