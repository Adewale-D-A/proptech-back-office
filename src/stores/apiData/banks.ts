import { createSlice } from "@reduxjs/toolkit";
import { Bank } from "../../types/apiData/banks";

export const banks = createSlice({
  name: "banks",
  initialState: {
    value: {
      status: false,
      data: [] as Bank[],
    },
  },
  reducers: {
    updateBanks: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    clearBanks: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const { updateBanks, clearBanks } = banks.actions;

export default banks.reducer;
