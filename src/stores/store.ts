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
import addEditCustomerInfo from "./inAppDataInterations/addEditCustomerInfo";
// inApp Data interactions

//user profile
import profile from "./authUser/profile";
import userAuthentication from "./authUser/auth";

// api data

// dahsboard
import serviceBreakdownData from "./apiData/dahsboards/services-breakdown";
import salesAnalyticsData from "./apiData/dahsboards/sales-analytics";
import salesChannelData from "./apiData/dahsboards/sales-channels";

import apartmentListsData from "./apiData/apartment-lists";
import bookingsListsData from "./apiData/bookings-lists";
import requestListsData from "./apiData/requests-lists";
import customersListData from "./apiData/customers-lists";
import invoiceListsData from "./apiData/invoice-lists";
// api data - plans and promotions
import taxRateListsData from "./apiData/tax-rate-lists";
import priceTypeListsData from "./apiData/price-type-lists";
import couponListsData from "./apiData/coupons-lists";
import packagesAndOffersListsData from "./apiData/packages-and-offers";
import additionalServiceListData from "./apiData/additional-services-lists";
import vendorServiceListData from "./apiData/vendor-services-lists";

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
      addEditCustomerInfo: addEditCustomerInfo,
      // inApp Data interactions

      //user
      userProfile: profile,
      userAuthentication: userAuthentication,

      // api data
      // dashboard
      serviceBreakdown: serviceBreakdownData,
      salesAnalytics: salesAnalyticsData,
      salesChannels: salesChannelData,

      allAparmentLists: apartmentListsData,
      allBookingsLists: bookingsListsData,
      allRequestLists: requestListsData,
      allCustomersLists: customersListData,
      allInvoiceLists: invoiceListsData,
      allAdditionalServices: additionalServiceListData,
      allVendorServices: vendorServiceListData,
      // api data - plans and promotions
      allTaxRates: taxRateListsData,
      allPriceTypes: priceTypeListsData,
      allCoupons: couponListsData,
      allPackagesAndOffers: packagesAndOffersListsData,
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
