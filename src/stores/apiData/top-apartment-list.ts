import { createSlice } from "@reduxjs/toolkit";
import { apartment } from "../../types/apiData/apartment";
import { pagination } from "../../types/pagination";

export const topApartmentListsData = createSlice({
  name: "all top apartments",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: apartment[];
        key: string;
      }[],
      data: [] as apartment[],
    },
  },
  reducers: {
    updateTopApartmentList: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    addApartmentToTopApartmentList: (state, action) => {
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
    removeApartmentInTopApartmentList: (state, action) => {
      const { id } = action?.payload;
      const currentArray = [...state.value.data];
      const currentIndex = currentArray.findIndex(
        (v: { id: number }) => v.id === id
      );
      if (currentIndex >= 0) {
        currentArray.splice(currentIndex, 1);
        state.value.data = currentArray;
      }
      //remove from paginated data
      const pagination_data = [...state.value.pagination];
      const removed = pagination_data.map((item, index) => {
        const sencondFilter = item.data.filter((data, i) => {
          return !(Number(data.id) === Number(id));
        });
        return {
          pagination_data: { ...item.pagination_data },
          data: sencondFilter,
          key: item?.key,
        };
      });
      state.value.pagination = removed;
    },
    replaceApartmentInTopApartmentList: (state, action) => {
      const { id } = action?.payload;
      const currentArray = state.value.data;
      const currentIndex = currentArray.findIndex(
        (v: { id: number }) => v.id === id
      );
      if (currentIndex >= 0) {
        currentArray.splice(currentIndex, 1, action?.payload);
        state.value.data = currentArray;
      }
      //REPLACE pagination data
      const pagination_data = [...state.value.pagination];
      const replacedItem = pagination_data.map((item, index) => {
        const sencondFilter = item.data.map((data, i) => {
          if (Number(data.id) === Number(id)) {
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
    clearTopApartmentList: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateTopApartmentList,
  addApartmentToTopApartmentList,
  addToPaginationHistory,
  removeApartmentInTopApartmentList,
  replaceApartmentInTopApartmentList,
  clearTopApartmentList,
} = topApartmentListsData.actions;

export default topApartmentListsData.reducer;
