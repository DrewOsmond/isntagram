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
    profile_picture: string | null;
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
      profile_picture:
        "https://pbs.twimg.com/profile_images/1292946523102121984/eSVCfcdc_400x400.jpg",
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
      profile_picture:
        "https://pbs.twimg.com/profile_images/1178631635606151168/yIlrcg4o_400x400.jpg",
    },
    content: "roflmao",
    image: "https://i.imgur.com/5H8eLQV.jpeg",
    likes: [],
    comments: [],
  },
  {
    id: 3,
    user: {
      username: "wee-wee",
      profile_picture: null,
    },
    content: "loooooool so funny",
    image: "https://i.imgur.com/dMT5DSe.jpeg",
    likes: [],
    comments: [],
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: mockData,
    loaded: true,
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
