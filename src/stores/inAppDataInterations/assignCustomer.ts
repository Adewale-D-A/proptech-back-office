import { createSlice } from "@reduxjs/toolkit";
import { customersById } from "../../types/apiData/customers";

export const assignCustomer = createSlice({
  name: "assign-to-customer",
  initialState: {
    value: {
      open: false,
      data: {} as customersById,
    },
  },
  reducers: {
    openAssignToCustomerView: (state) => {
      state.value.open = true;
    },
    closeAssignToCustomerView: (state) => {
      state.value.open = false;
    },
    updateAssignToCustomerData: (state, action) => {
      state.value.data = action?.payload;
    },
    clearAssignToCustomerData: (state) => {
      state.value.data = {} as any;
    },
  },
});

export const {
  openAssignToCustomerView,
  closeAssignToCustomerView,
  updateAssignToCustomerData,
  clearAssignToCustomerData,
} = assignCustomer.actions;

export default assignCustomer.reducer;
