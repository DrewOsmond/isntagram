import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface NewPost {
  image: string;
  content: string;
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
  async ({ image, content }: NewPost) => {
    const formData = new FormData();
    console.log(image);
    // formData.append("name", "Image Upload");
    formData.append("photo", image);
    // formData.append("content", content);
    const { data } = await axios.post(
      "http://localhost:4000/api/posts/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
