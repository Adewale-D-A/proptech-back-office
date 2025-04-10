import { createSlice } from "@reduxjs/toolkit";
import { pagination } from "../../../types/pagination";
import { ownerReportSpreadsheet } from "../../../types/apiData/reports";

export const ownersReportsSpreadsheetData = createSlice({
  name: "owners-reports",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: ownerReportSpreadsheet;
      }[],
      data: {} as ownerReportSpreadsheet,
    },
  },
  reducers: {
    updateOwnersSpreadsheetReport: (state, action) => {
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
  },
});

export const { updateOwnersSpreadsheetReport, addToPaginationHistory } =
  ownersReportsSpreadsheetData.actions;

export default ownersReportsSpreadsheetData.reducer;
