import { createSlice } from "@reduxjs/toolkit";

export const addEditApartmentInfo = createSlice({
  name: "add-edit-apartment-information",
  initialState: {
    value: {
      data: {
        id: "",
        removeImages: [] as number[],
        removeImages2: [] as number[],
        apartmentDetails: {
          building_id: "",
          name: "",
          roomOption: "",
          images: [],
          amount: "",
          location_group: "",
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
          cancellationPolicies: [],
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
    addRemovableImages: (state, action) => {
      const curremtState = state.value.data.removeImages;
      state.value.data.removeImages = [...curremtState, action?.payload?.id];
    },
    addRemovableImages2: (state, action) => {
      const curremtState = state.value.data.removeImages2;
      state.value.data.removeImages2 = [...curremtState, action?.payload?.id];
    },
    clearAllApartmentInfo: (state) => {
      state.value.data = {
        id: "",
        removeImages: [],
        removeImages2: [],
        apartmentDetails: {
          building_id: "",
          name: "",
          roomOption: "",
          images: [],
          amount: "",
          location_group: "",
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
          cancellationPolicies: [],
        },
      };
    },
    clearRemovableIdStore: (state) => {
      state.value.data.removeImages = [];
    },
    clearRemovableIdStore2: (state) => {
      state.value.data.removeImages = [];
    },
  },
});

export const {
  updateApartmentInfoId,
  updateApartmentDetails,
  updateApartmentFeatures,
  updateApartmentPolicies,
  addRemovableImages,
  addRemovableImages2,
  clearAllApartmentInfo,
  clearRemovableIdStore,
  clearRemovableIdStore2,
} = addEditApartmentInfo.actions;

export default addEditApartmentInfo.reducer;
