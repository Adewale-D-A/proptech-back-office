import { createSlice } from "@reduxjs/toolkit";
import { pagination } from "../../../types/pagination";
import { dailyRoomReportList } from "../../../types/apiData/reports";

export const dailyRoomReport = createSlice({
  name: "daily-room-reports",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: dailyRoomReportList[];
        key: string;
      }[],
      data: [] as dailyRoomReportList[],
    },
  },
  reducers: {
    updateDailyRoomReport: (state, action) => {
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
  updateDailyRoomReport,
  addToPaginationHistory,
  clearDailyRoomReport,
} = dailyRoomReport.actions;

export default dailyRoomReport.reducer;
