import { createSlice } from "@reduxjs/toolkit";
import { pagination } from "../../types/pagination";
import { maintenanceRequestsById } from "../../types/apiData/maintenance-request";

export const maintenanceRequestsListData = createSlice({
  name: "maintenance-requests",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: maintenanceRequestsById[];
        key: string;
      }[],
      data: [] as maintenanceRequestsById[],
    },
  },
  reducers: {
    updateMaintenanceRequestList: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    addMaintenanceRequestToList: (state, action) => {
      state.value.data = [...state.value.data, action?.payload];
      //include in pagination data
      const pagination_data = [...state.value.pagination];
      const lastIndex = pagination_data?.length - 1;
      const addedItem = pagination_data.map((item, index) => {
        if (lastIndex === index) {
          return {
            pagination_data: item?.pagination_data,
            data: [...item.data, action?.payload],
            key: item?.key,
          };
        } else {
          return item;
        }
      });
      state.value.pagination = addedItem;
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
    removeMaintenanceRequestInList: (state, action) => {
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
          key: item?.key,
        };
      });
      state.value.pagination = removed;
    },
    replaceMaintenanceRequestInList: (state, action) => {
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
          key: item?.key,
        };
      });
      state.value.pagination = replacedItem;
    },
    updateMaintenanceRequestStatusInList: (state, action) => {
      const { id, status } = action?.payload;
      const currentArray = state.value.data;
      const currentIndex = currentArray.findIndex(
        (v: { id: number }) => String(v.id) === String(id)
      );
      const currentDataset = currentArray[currentIndex];
      if (currentIndex >= 0) {
        currentArray.splice(currentIndex, 1, { ...currentDataset, status });
        state.value.data = currentArray;
      }
      //REPLACE pagination data
      const pagination_data = [...state.value.pagination];
      const replacedItem = pagination_data.map((item, index) => {
        const sencondFilter = item.data.map((data, i) => {
          if (String(data.id) === String(id)) {
            return { ...currentDataset, status };
          } else {
            return data;
          }
        });
        return {
          pagination_data: { ...item.pagination_data },
          data: sencondFilter,
          key: item?.key,
        };
      });
      state.value.pagination = replacedItem;
    },
    clearMaintenanceRequestList: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateMaintenanceRequestList,
  updateMaintenanceRequestStatusInList,
  addMaintenanceRequestToList,
  addToPaginationHistory,
  removeMaintenanceRequestInList,
  replaceMaintenanceRequestInList,
  clearMaintenanceRequestList,
} = maintenanceRequestsListData.actions;

export default maintenanceRequestsListData.reducer;
