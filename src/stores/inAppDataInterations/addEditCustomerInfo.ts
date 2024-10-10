import { createSlice } from "@reduxjs/toolkit";

export const addEditCustomerInfo = createSlice({
  name: "add-edit-customer-information",
  initialState: {
    value: {
      data: {
        id: "",
        customerDetails: {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          profileImg: { name: "", size: 0, preview: "" },
          gender: "female",
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
          idImage: { name: "", size: 0, preview: "" },
          pinGenerated: "",
          notes: "",
        },
        customerCompany: {
          companyName: "",
          VATid: "",
          companyEmail: "",
          companyId: "",
          companyCountry: "",
          companyState: "",
          companyCity: "",
          companyAddress: "",
        },
        customerSalesChannel: {
          isSalesChannel: false,
          salesChannelName: "",
          salesChannelCommision: "",
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
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          profileImg: { name: "", size: 0, preview: "" },
          gender: "female",
          dob: "",
          country: "Nigeria",
          state: "",
          city: "",
          address: "",
        },
        customerVerification: {
          placeOfBirth: "",
          idType: "",
          idNumber: "",
          idImage: { name: "", size: 0, preview: "" },
          pinGenerated: "",
          notes: "",
        },
        customerCompany: {
          companyName: "",
          VATid: "",
          companyEmail: "",
          companyId: "",
          companyCountry: "Nigeria",
          companyState: "",
          companyCity: "",
          companyAddress: "",
        },
        customerSalesChannel: {
          isSalesChannel: false,
          salesChannelName: "",
          salesChannelCommision: "",
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
