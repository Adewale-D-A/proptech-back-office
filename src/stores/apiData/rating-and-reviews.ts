import { createSlice } from "@reduxjs/toolkit";
import { pagination } from "../../types/pagination";
import { ratingsAndReviews } from "../../types/apiData/ratings-and-reviews";

export const ratingsAndReviewsListData = createSlice({
  name: "ratigns and reviews",
  initialState: {
    value: {
      status: false,
      pagination: [] as {
        pagination_data: pagination;
        data: ratingsAndReviews[];
      }[],
      data: [] as ratingsAndReviews[],
    },
  },
  reducers: {
    updateRatingsAndReviewsList: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    addRatingsAndReviewsToList: (state, action) => {
      state.value.data = [...state.value.data, action?.payload];
      //include in pagination data
      const pagination_data = [...state.value.pagination];
      const lastIndex = pagination_data?.length - 1;
      const addedItem = pagination_data.map((item, index) => {
        if (lastIndex === index) {
          return {
            pagination_data: item?.pagination_data,
            data: [...item.data, action?.payload],
          };
        } else {
          return item;
        }
      });
      state.value.pagination = addedItem;
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
    removeRatingsAndReviewsInList: (state, action) => {
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
    replaceRatingsAndReviewsInList: (state, action) => {
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
    clearRatingsAndReviewsList: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateRatingsAndReviewsList,
  addRatingsAndReviewsToList,
  addToPaginationHistory,
  removeRatingsAndReviewsInList,
  replaceRatingsAndReviewsInList,
  clearRatingsAndReviewsList,
} = ratingsAndReviewsListData.actions;

export default ratingsAndReviewsListData.reducer;
