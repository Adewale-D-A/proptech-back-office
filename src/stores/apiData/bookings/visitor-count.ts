import { createSlice } from "@reduxjs/toolkit";
import { visitorCount } from "../../../types/apiData/bookings/count";

export const visitorsCount = createSlice({
  name: "visitor-count",
  initialState: {
    value: {
      status: false,
      data: {} as visitorCount,
    },
  },
  reducers: {
    updateVisitorCount: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    clearVisitorCount: (state) => {
      state.value.status = false;
      state.value.data = {} as any;
    },
  },
});

export const { updateVisitorCount, clearVisitorCount } = visitorsCount.actions;

export default visitorsCount.reducer;
