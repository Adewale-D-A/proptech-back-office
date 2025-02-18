import { createSlice } from "@reduxjs/toolkit";
import { pagination } from "../../../types/pagination";
import { maintenanceExpensesReport } from "../../../types/apiData/reports";

export const maintenanceExpensesReports = createSlice({
  name: "maintenance-expenses-reports",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: maintenanceExpensesReport[];
      }[],
      data: [] as maintenanceExpensesReport[],
    },
  },
  reducers: {
    updateMaintenanceExpensesReport: (state, action) => {
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
    removeMaintenanceExpensesInList: (state, action) => {
      const { id } = action?.payload;
      const currentArray = [...state.value.data];
      const currentIndex = currentArray.findIndex(
        (v: { id: number }) => String(v.id) === String(id)
      );
      if (currentIndex >= 0) {
        currentArray.splice(currentIndex, 1);
        state.value.data = currentArray;
      }
      //remove from paginated data
      const pagination_data = [...state.value.pagination];
      const removed = pagination_data.map((item, index) => {
        const sencondFilter = item.data.filter((data, i) => {
          return !(String(data.id) === String(id));
        });
        return {
          pagination_data: { ...item.pagination_data },
          data: sencondFilter,
        };
      });
      state.value.pagination = removed;
    },
    replaceMaintenanceExpensesInList: (state, action) => {
      const { id } = action?.payload;
      const currentArray = state.value.data;
      const currentIndex = currentArray.findIndex(
        (v: { id: number }) => String(v.id) === String(id)
      );
      if (currentIndex >= 0) {
        currentArray.splice(currentIndex, 1, action?.payload);
        state.value.data = currentArray;
      }
      //REPLACE pagination data
      const pagination_data = [...state.value.pagination];
      const replacedItem = pagination_data.map((item, index) => {
        const sencondFilter = item.data.map((data, i) => {
          if (String(data.id) === String(id)) {
            return { ...action.payload };
          } else {
            return data;
          }
        });
        return {
          pagination_data: { ...item.pagination_data },
          data: sencondFilter,
        };
      });
      state.value.pagination = replacedItem;
    },
    clearMaintenanceExpensesReport: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateMaintenanceExpensesReport,
  addToPaginationHistory,
  clearMaintenanceExpensesReport,
  removeMaintenanceExpensesInList, 
  replaceMaintenanceExpensesInList
} = maintenanceExpensesReports.actions;

export default maintenanceExpensesReports.reducer;
