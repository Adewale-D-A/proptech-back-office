import { createSlice } from "@reduxjs/toolkit";
import { pagination } from "../../../types/pagination";
import { revenueReportList } from "../../../types/apiData/reports";

export const revenueReports = createSlice({
  name: "revenue-reports",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: revenueReportList[];
      }[],
      data: [] as revenueReportList[],
    },
  },
  reducers: {
    updateRevenueReport: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    addToPaginationHistory: (state, action) => {
      const found = state.value?.pagination?.find(
        (item) =>
          item?.pagination_data?.current_page ===
          action?.payload?.pagination_data?.current_page
      );
      if (!found) {
        state.value.pagination = [
          ...state.value.pagination,
          {
            pagination_data: action?.payload?.pagination_data,
            data: action?.payload?.data,
          },
        ];
      }
    },
    clearRevenueReport: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateRevenueReport,
  addToPaginationHistory,
  clearRevenueReport,
} = revenueReports.actions;

export default revenueReports.reducer;
