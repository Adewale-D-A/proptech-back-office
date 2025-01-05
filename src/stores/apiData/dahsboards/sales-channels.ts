import { createSlice } from "@reduxjs/toolkit";

export const salesChannelData = createSlice({
  name: "sales channels",
  initialState: {
    value: {
      status: false,
      data: [
        {
          channel: "Website",
          count: 0,
          percentage: 100,
        },
      ] as {
        channel: string;
        count: number;
        percentage: number;
      }[],
      pieChartStatistics: [100],
    },
  },
  reducers: {
    updateSalesChannel: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload;
    },
    updatePieChart: (state, action) => {
      state.value.pieChartStatistics = action?.payload;
    },
    clearSalesChannel: (state) => {
      state.value.status = false;
      state.value.data = [];
      state.value.pieChartStatistics = [100];
    },
  },
});

export const { updateSalesChannel, updatePieChart, clearSalesChannel } =
  salesChannelData.actions;

export default salesChannelData.reducer;
