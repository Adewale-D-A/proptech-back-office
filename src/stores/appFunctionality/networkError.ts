import { createSlice } from "@reduxjs/toolkit";

export const networkStatus = createSlice({
  name: "network error",
  initialState: {
    value: {
      is_network_error: false,
    },
  },
  reducers: {
    updateNetworkError: (state) => {
      state.value.is_network_error = true;
    },
    defaultNetworkState: (state) => {
      state.value.is_network_error = false;
    },
  },
});

export const { updateNetworkError, defaultNetworkState } =
  networkStatus.actions;

export default networkStatus.reducer;
