import { createSlice } from "@reduxjs/toolkit";

export const addEditApartmentInfo = createSlice({
  name: "add-edit-apartment-information",
  initialState: {
    value: {
      data: {
        apartmentDetails: {
          name: "",
          roomOption: "",
          images: [],
          amount: "",
          location: "",
          aboutLocation: "",
        },
        apartmentFeatures: {
          noBeds: "",
          noBaths: "",
          whatToExpect: "",
          pointOfInterest: "",
          safetyAndSecurity: "",
          availabilityStatus: "",
        },
        apartmentPolicy: {
          rules: "",
          cancellationPolicies: "",
        },
      },
    },
  },
  reducers: {
    updateApartmentDetails: (state, action) => {
      state.value.data.apartmentDetails = action?.payload;
    },
    updateApartmentFeatures: (state, action) => {
      state.value.data.apartmentFeatures = action?.payload;
    },
    updateApartmentPolicies: (state, action) => {
      state.value.data.apartmentPolicy = action?.payload;
    },
    clearAllApartmentInfo: (state) => {
      state.value.data = {
        apartmentDetails: {
          name: "",
          roomOption: "",
          images: [],
          amount: "",
          location: "",
          aboutLocation: "",
        },
        apartmentFeatures: {
          noBeds: "",
          noBaths: "",
          whatToExpect: "",
          pointOfInterest: "",
          safetyAndSecurity: "",
          availabilityStatus: "",
        },
        apartmentPolicy: {
          rules: "",
          cancellationPolicies: "",
        },
      };
    },
  },
});

export const {
  updateApartmentDetails,
  updateApartmentFeatures,
  updateApartmentPolicies,
  clearAllApartmentInfo,
} = addEditApartmentInfo.actions;

export default addEditApartmentInfo.reducer;
