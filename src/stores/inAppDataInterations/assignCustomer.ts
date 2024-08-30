import { createSlice } from "@reduxjs/toolkit";

export const assignCustomer = createSlice({
  name: "assign-to-customer",
  initialState: {
    value: {
      open: false,
      data: {
        userId: "",
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        countryCode: "",
        address: "",
      },
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
  },
});

export const {
  openAssignToCustomerView,
  closeAssignToCustomerView,
  updateAssignToCustomerData,
} = assignCustomer.actions;

export default assignCustomer.reducer;
