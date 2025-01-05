import { createSlice } from "@reduxjs/toolkit";

export const salesAnalyticsData = createSlice({
  name: "sales analytics",
  initialState: {
    value: {
      status: false,
      data: [] as {
        total_amount: number;
        month: number;
        year: number;
      }[],
      monthlyAmountsStatistics: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  reducers: {
    updateSalesAnalytics: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload;
    },
    updateMonthlyStatistsics: (state, action) => {
      state.value.monthlyAmountsStatistics = action?.payload;
    },
    clearSalesAnalytics: (state) => {
      state.value.status = false;
      state.value.data = [];
      state.value.monthlyAmountsStatistics = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
    },
  },
});

export const {
  updateSalesAnalytics,
  updateMonthlyStatistsics,
  clearSalesAnalytics,
} = salesAnalyticsData.actions;

export default salesAnalyticsData.reducer;
