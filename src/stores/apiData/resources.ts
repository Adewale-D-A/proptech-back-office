import { createSlice } from "@reduxjs/toolkit";
import { resource } from "../../types/apiData/resources";

export const resourcesData = createSlice({
  name: "all-resources",
  initialState: {
    value: {
      status: false,
      rawdata: [] as resource[],
      reformedData: [] as resource[],
    },
  },
  reducers: {
    updateResources: (state, action) => {
      state.value.status = true;
      state.value.rawdata = action?.payload?.rawdata;
      state.value.reformedData = action?.payload?.reformedData;
    },
    clearResourceList: (state) => {
      state.value.status = false;
      state.value.rawdata = [];
      state.value.reformedData = [];
    },
  },
});

export const { updateResources, clearResourceList } = resourcesData.actions;

export default resourcesData.reducer;
