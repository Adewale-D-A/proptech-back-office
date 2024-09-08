import { configureStore } from "@reduxjs/toolkit";

//app functionality
import navMenuFunctions from "./appFunctionality/navMenuFunctions";
import snackBar from "./appFunctionality/snackbar";
import networkStatus from "./appFunctionality/networkError";
import pageProperties from "./appFunctionality/pageProperties";
//app functionality

// inApp Data interactions

import assignCustomer from "./inAppDataInterations/assignCustomer";
import addEditApartmentInfo from "./inAppDataInterations/addEditApartmentInfo";
// inApp Data interactions

//user profile
import profile from "./authUser/profile";
import userAuthentication from "./authUser/auth";

// api data
import apartmentListsData from "./apiData/apartment-lists";

export const adminStore = () => {
  return configureStore({
    reducer: {
      //app functionality
      pageProperties: pageProperties,
      menuFunctions: navMenuFunctions,
      snackbar: snackBar,
      networkStatus: networkStatus,

      // inApp Data interactions
      assignCustomer: assignCustomer,
      addEditApartmentInfo: addEditApartmentInfo,
      // inApp Data interactions

      //user
      userProfile: profile,
      userAuthentication: userAuthentication,

      // api data
      allAparmentLists: apartmentListsData,
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof adminStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
