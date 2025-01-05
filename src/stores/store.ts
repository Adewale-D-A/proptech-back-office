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
import userAuthentication from "./authUser/auth";

// api data

// dahsboard
import serviceBreakdownData from "./apiData/dahsboards/services-breakdown";
import salesAnalyticsData from "./apiData/dahsboards/sales-analytics";
import salesChannelData from "./apiData/dahsboards/sales-channels";

// bookings
import arrivingReservation from "./apiData/bookings/arriving-reservation";
import departingReservation from "./apiData/bookings/departing-reservation";
import latestReservation from "./apiData/bookings/lastest-reservation";
import upcomingReservation from "./apiData/bookings/upcoming-reservation";
import visitorsCount from "./apiData/bookings/visitor-count";
import dailyOccupancy from "./apiData/bookings/daily-occupancy";

// apartments
import apartmentListsData from "./apiData/apartment-lists";
import topApartmentListsData from "./apiData/top-apartment-list";
import bookingsListsData from "./apiData/bookings-lists";
import requestListsData from "./apiData/requests-lists";
import customersListData from "./apiData/customers-lists";
import invoiceListsData from "./apiData/invoice/invoice-lists";
import amenitiesData from "./apiData/amenities";
import safetyAndSecurityData from "./apiData/safety-and-security";
import extraOptionData from "./apiData/extra-options";
import roomOptionsData from "./apiData/room-options";
import houseRulesData from "./apiData/house-rules";
import locationGroupings from "./apiData/apartment/location-groupings";

import chatListData from "./apiData/chat-list";
// admins
import adminsListData from "./apiData/admins-list";
import rolesListData from "./apiData/roles-lists";
import resourcesData from "./apiData/resources";
// api data - plans and promotions
import taxRateListsData from "./apiData/tax-rate-lists";
import priceTypeListsData from "./apiData/price-type-lists";
import couponListsData from "./apiData/coupons-lists";
import packagesAndOffersListsData from "./apiData/packages-and-offers";
import additionalServiceListData from "./apiData/additional-services-lists";
import vendorServiceListData from "./apiData/vendor-services-lists";
// special prices and restriction
import restrictionsList from "./apiData/restrictions";
import specialPricesList from "./apiData/special-prices";
// service types
import serviceTypeData from "./apiData/service-types";

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
      userAuthentication: userAuthentication,

      // api data
      // dashboard
      serviceBreakdown: serviceBreakdownData,
      salesAnalytics: salesAnalyticsData,
      salesChannels: salesChannelData,

      // bookings
      arrivingReservation: arrivingReservation,
      departingReservation: departingReservation,
      latestRestervation: latestReservation,
      upcomingReservation: upcomingReservation,
      visitorCount: visitorsCount,
      dailyOccupany: dailyOccupancy,

      restriction: restrictionsList,
      specialPrices: specialPricesList,

      serviceType: serviceTypeData,

      // appartments
      allAparmentLists: apartmentListsData,
      topAparmentLists: topApartmentListsData,
      allAmenities: amenitiesData,
      allSaeftyAndSecurity: safetyAndSecurityData,
      allExtraOptions: extraOptionData,
      allRoomOptions: roomOptionsData,
      allHouseRules: houseRulesData,
      lcoationgGrouping: locationGroupings,

      allBookingsLists: bookingsListsData,
      allRequestLists: requestListsData,
      allCustomersLists: customersListData,
      allInvoiceLists: invoiceListsData,
      allAdditionalServices: additionalServiceListData,
      allVendorServices: vendorServiceListData,
      chatList: chatListData,

      // admins
      allAdminsLists: adminsListData,
      allRolesLists: rolesListData,
      resources: resourcesData,
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
