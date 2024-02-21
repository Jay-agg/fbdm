import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null, // Initial data field
};

const fbSlice = createSlice({
  name: "fb",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addData } = fbSlice.actions;

export default fbSlice.reducer;
