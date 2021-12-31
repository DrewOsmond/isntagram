import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    errors: false,
    loading: false,
  },
  reducers: {},
  extraReducers: {},
});

export default sessionSlice.reducer;
