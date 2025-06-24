import { createSlice } from "@reduxjs/toolkit";
import { pagination } from "../../../types/pagination";
import { occupancyTimeReportList } from "../../../types/apiData/reports";

export const perTimeOccupancyeport = createSlice({
  name: "per-time-occupancy-reports",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: occupancyTimeReportList[];
        key: string;
      }[],
      data: [] as occupancyTimeReportList[],
    },
  },
  reducers: {
    updatePerTimeReport: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    addToPaginationHistory: (state, action) => {
      const found = state.value?.pagination?.find(
        (item) => item?.key === action?.payload?.key
      );
      if (!found) {
        state.value.pagination = [
          ...state.value.pagination,
          {
            pagination_data: action?.payload?.pagination_data,
            data: action?.payload?.data,
            key: action?.payload?.key,
          },
        ];
      }
    },
    clearDailyRoomReport: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updatePerTimeReport,
  addToPaginationHistory,
  clearDailyRoomReport,
} = perTimeOccupancyeport.actions;

export default perTimeOccupancyeport.reducer;
