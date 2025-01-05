import { createSlice } from "@reduxjs/toolkit";

export const snackBar = createSlice({
  name: "snackbar information popups",
  initialState: {
    value: {
      show: false,
      message: "",
      isError: false,
    },
  },
  reducers: {
    openSnackbar: (state, action) => {
      state.value.show = true;
      state.value.message = action?.payload?.message;
      state.value.isError = action?.payload?.isError;
    },
    closeSnackBar: (state) => {
      state.value.show = false;
      state.value.message = "";
      state.value.isError = false;
    },
  },
});

export const { openSnackbar, closeSnackBar } = snackBar.actions;

export default snackBar.reducer;
