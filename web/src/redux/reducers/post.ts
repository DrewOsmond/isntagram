import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface NewPost {
  image: string;
  content: string;
  username: string;
}

interface Post {
  id: number;
  user: {
    username: string;
    profile_picture: string;
  };
  content: string;
  image: string;
  likes: [];
  comments: [];
}

const mockData: Post[] = [
  {
    id: 1,
    user: {
      username: "drew",
      profile_picture: "",
    },
    content: "look at this kewl eemage",
    image: "https://i.imgur.com/hqljdBy.jpeg",
    likes: [],
    comments: [],
  },
  {
    id: 2,
    user: {
      username: "bleh123",
      profile_picture: "",
    },
    content: "roflmao",
    image: "https://i.imgur.com/5H8eLQV.jpeg",
    likes: [],
    comments: [],
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (_state, action) => {
      console.log(action.payload);
    });
  },
});

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ image, content, username }: NewPost) => {
    const form = new FormData();
    form.append("photo", {
      //@ts-ignore
      name: `${username}-${new Date()}`,
      uri: image,
      type: `image/jpg`,
    });
    // form.append("content", content);
    const { data } = await axios.post("/api/posts/upload", form, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    const { location } = data;

    const response = await axios.post("/api/posts/", {
      content,
      image: location,
    });

    console.log(response.data);
  }
);

export default postSlice.reducer;
