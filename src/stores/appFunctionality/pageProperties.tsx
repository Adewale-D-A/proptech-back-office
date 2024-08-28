import { createSlice } from "@reduxjs/toolkit";

export const pageProperties = createSlice({
  name: "page properties",
  initialState: {
    value: {
      breadCrumb: [] as {
        url: string;
        label: string;
        icon: React.ReactNode;
      }[],
      pageTitle: "Dashboard" as string,
      pageDescription: "" as string,
      setFailedToLoad: null as any,
      retryRequest: null as any,
      isLoading: false as boolean,
      failedToLoad: false as boolean,
    },
  },
  reducers: {
    updatePageProperties: (state, action) => {
      state.value = action?.payload;
    },
  },
});

export const { updatePageProperties } = pageProperties.actions;

export default pageProperties.reducer;
