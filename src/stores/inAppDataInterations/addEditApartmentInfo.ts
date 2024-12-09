import { createSlice } from "@reduxjs/toolkit";

export const addEditApartmentInfo = createSlice({
  name: "add-edit-apartment-information",
  initialState: {
    value: {
      data: {
        id: "",
        apartmentDetails: {
          name: "",
          roomOption: "",
          images: [],
          amount: "",
          location: "",
          aboutLocation: "",
          city: "",
          state: "",
          country: "",
          longitude: 0,
          latitude: 0,
        },
        apartmentFeatures: {
          noBeds: "",
          noBaths: "",
          whatToExpect: [],
          extraOptions: [],
          pointOfInterest: "",
          safetyAndSecurity: [],
          availabilityStatus: "",
        },
        apartmentPolicy: {
          rules: [],
          cautionFee: "",
          maxGuest: "",
          cancellationPolicies: "",
        },
      },
    },
  },
  reducers: {
    updateApartmentInfoId: (state, action) => {
      state.value.data.id = action.payload?.id;
    },
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
        id: "",
        apartmentDetails: {
          name: "",
          roomOption: "",
          images: [],
          amount: "",
          location: "",
          aboutLocation: "",
          city: "",
          state: "",
          country: "",
          longitude: 0,
          latitude: 0,
        },
        apartmentFeatures: {
          noBeds: "",
          noBaths: "",
          whatToExpect: [],
          extraOptions: [],
          pointOfInterest: "",
          safetyAndSecurity: [],
          availabilityStatus: "",
        },
        apartmentPolicy: {
          rules: [],
          cautionFee: "",
          maxGuest: "",
          cancellationPolicies: "",
        },
      };
    },
  },
});

export const {
  updateApartmentInfoId,
  updateApartmentDetails,
  updateApartmentFeatures,
  updateApartmentPolicies,
  clearAllApartmentInfo,
} = addEditApartmentInfo.actions;

export default addEditApartmentInfo.reducer;
