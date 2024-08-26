import { createSlice } from "@reduxjs/toolkit";

export const navMenuFunctions = createSlice({
  name: "navigation menu functionality",
  initialState: {
    value: {
      fullMenuView: false,
    },
  },
  reducers: {
    toggleMenuView: (state) => {
      state.value.fullMenuView = !state.value.fullMenuView;
    },
  },
});

export const { toggleMenuView } = navMenuFunctions.actions;

export default navMenuFunctions.reducer;
