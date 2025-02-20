import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
    removeAllFeeds: (state, action) => {
      return null;
    }
  },
});

export const { addFeed, removeUserFromFeed, removeAllFeeds } = feedSlice.actions;
export default feedSlice.reducer;