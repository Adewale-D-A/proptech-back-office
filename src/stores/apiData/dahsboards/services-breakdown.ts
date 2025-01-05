import { createSlice } from "@reduxjs/toolkit";

export const serviceBreakdownData = createSlice({
  name: "service breakdown",
  initialState: {
    value: {
      status: false,
      data: {
        number_of_shortlets: 0,
        number_of_bookings: 0,
        no_of_additional_request: 0,
        number_of_guests: 0,
      },
    },
  },
  reducers: {
    updateAllServiceBreakdown: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload;
    },
    clearServiceBreakdown: (state) => {
      state.value.status = false;
      state.value.data = {
        number_of_shortlets: 0,
        number_of_bookings: 0,
        no_of_additional_request: 0,
        number_of_guests: 0,
      };
    },
  },
});

export const { updateAllServiceBreakdown, clearServiceBreakdown } =
  serviceBreakdownData.actions;

export default serviceBreakdownData.reducer;
