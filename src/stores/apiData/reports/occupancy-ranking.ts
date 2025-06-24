import { createSlice } from "@reduxjs/toolkit";
import { pagination } from "../../../types/pagination";
import { occupancyRankingReportList } from "../../../types/apiData/reports";

export const occupancyRankingReports = createSlice({
  name: "occupancy-ranking-reports",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: occupancyRankingReportList[];
        key: string;
        summary: occupancyRankingReportList[];
      }[],
      data: [] as occupancyRankingReportList[],
      summary: [] as occupancyRankingReportList[],
    },
  },
  reducers: {
    updateOccuancyRankingReport: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
      state.value.summary = action?.payload?.summary;
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
            summary: action?.payload?.summary,
          },
        ];
      }
    },
    clearOccuancyRankingReport: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateOccuancyRankingReport,
  addToPaginationHistory,
  clearOccuancyRankingReport,
} = occupancyRankingReports.actions;

export default occupancyRankingReports.reducer;
