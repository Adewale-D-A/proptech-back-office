import { createSlice } from "@reduxjs/toolkit";

export const addEditCustomerInfo = createSlice({
  name: "add-edit-customer-information",
  initialState: {
    value: {
      data: {
        id: "",
        customerDetails: {
          firstname: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          profileImg: "",
          gender: "",
          dob: "",
          country: "",
          state: "",
          city: "",
          address: "",
        },
        customerVerification: {
          placeOfBirth: "",
          idType: "",
          idNumber: "",
          idImage: "",
          pinGenerated: "",
          notes: "",
        },
        customerCompany: {
          name: "",
          VATid: "",
          email: "",
          id: "",
          country: "",
          state: "",
          city: "",
          address: "",
        },
        customerSalesChannel: {
          isSalesChannel: false,
          name: "",
          commision: "",
          calculateCommissionOn: "",
          applyCommissionOn: "",
        },
      },
    },
  },
  reducers: {
    updateCustomerInfoId: (state, action) => {
      state.value.data.id = action.payload?.id;
    },
    updateCustomerDetails: (state, action) => {
      state.value.data.customerDetails = action?.payload;
    },
    updateCustomerVerification: (state, action) => {
      state.value.data.customerVerification = action?.payload;
    },
    updateCustomerCompany: (state, action) => {
      state.value.data.customerCompany = action?.payload;
    },
    updateCustomerSalesChannel: (state, action) => {
      state.value.data.customerSalesChannel = action?.payload;
    },
    clearAllCustomerInfo: (state) => {
      state.value.data = {
        id: "",
        customerDetails: {
          firstname: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          profileImg: "",
          gender: "",
          dob: "",
          country: "",
          state: "",
          city: "",
          address: "",
        },
        customerVerification: {
          placeOfBirth: "",
          idType: "",
          idNumber: "",
          idImage: "",
          pinGenerated: "",
          notes: "",
        },
        customerCompany: {
          name: "",
          VATid: "",
          email: "",
          id: "",
          country: "",
          state: "",
          city: "",
          address: "",
        },
        customerSalesChannel: {
          isSalesChannel: false,
          name: "",
          commision: "",
          calculateCommissionOn: "",
          applyCommissionOn: "",
        },
      };
    },
  },
});

export const {
  updateCustomerInfoId,
  updateCustomerDetails,
  updateCustomerVerification,
  updateCustomerCompany,
  clearAllCustomerInfo,
  updateCustomerSalesChannel,
} = addEditCustomerInfo.actions;

export default addEditCustomerInfo.reducer;
