import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
    removeAllRequest: (state, action) => {
      return null;
    }
  },
});

export const { addRequests, removeRequest, removeAllRequest } = requestSlice.actions;
export default requestSlice.reducer;