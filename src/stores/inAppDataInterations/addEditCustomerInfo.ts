import { createSlice } from "@reduxjs/toolkit";

export const addEditCustomerInfo = createSlice({
  name: "add-edit-customer-information",
  initialState: {
    value: {
      data: {
        id: "",
        customerDetails: {
          type: "",
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          profile_photo: { name: "", size: 0, preview: "" },
          gender: "female",
          dob: "",
          country: "",
          state: "",
          city: "",
          address: "",
        },
        customerVerification: {
          place_of_birth: "",
          id_type: "",
          id_number: "",
          identity_document: { name: "", size: 0, preview: "" },
          password: "",
          notes: "",
        },
        customerCompany: {
          company_name: "",
          vat_id: "",
          company_email: "",
          company_id: "",
          company_country: "",
          company_state: "",
          company_city: "",
          company_address: "",
        },
        customerSalesChannel: {
          sales_channel: false,
          sales_channel_name: "",
          commission_per_booking: "",
          calculate_commission_on: "",
          apply_commission_on: "",
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
          type: "",
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          profile_photo: { name: "", size: 0, preview: "" },
          gender: "female",
          dob: "",
          country: "",
          state: "",
          city: "",
          address: "",
        },
        customerVerification: {
          place_of_birth: "",
          id_type: "",
          id_number: "",
          identity_document: { name: "", size: 0, preview: "" },
          password: "",
          notes: "",
        },
        customerCompany: {
          company_name: "",
          vat_id: "",
          company_email: "",
          company_id: "",
          company_country: "",
          company_state: "",
          company_city: "",
          company_address: "",
        },
        customerSalesChannel: {
          sales_channel: false,
          sales_channel_name: "",
          commission_per_booking: "",
          calculate_commission_on: "",
          apply_commission_on: "",
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
