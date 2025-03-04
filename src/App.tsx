import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PageNotFound from "./pages/404";
import Login from "./pages/auth/login";
import ResetPassword from "./pages/auth/reset-passoword";
import ChangePassword from "./pages/auth/reset-passoword/change-password";
// import SnackBar from "./components/snackbar";
import { useAppSelector } from "./stores/hooks";
import Unauthorised from "./pages/unauthorised";
import AlertModal from "./components/infoModal";
import RedirectHome from "./routeProtectors/redirectHome";
import PersistLogin from "./routeProtectors/persistLogin";
import Notification from "./pages/notification";
import Customers from "./pages/customers";
import Bookings from "./pages/bookings";
import DashboardOverview from "./pages/dashboard-overview";
import ApartmentDetail from "./pages/apartments/apartment-details";
import EditApartmentDetails from "./pages/apartments/edit-apartment/apartment-detail";
import EditApartmentFeatures from "./pages/apartments/edit-apartment/apartment-features";
import EditApartmentPolicies from "./pages/apartments/edit-apartment/apartment-policy";
import AddNewApartmentDetails from "./pages/apartments/new-apartment/apartment-detail";
import AddNewApartmentFeatures from "./pages/apartments/new-apartment/apartment-features";
import AddNewApartmentPolicies from "./pages/apartments/new-apartment/apartment-policy";
import CheckCalendar from "./pages/apartments/check-calendar";
import EditBookingReservation from "./pages/bookings/booking-detail/edit-reservation";
import RequestDetailsById from "./pages/bookings/requests/request-details";
import AddNewCustomerDetails from "./pages/customers/add-new-customer/customer-details";
import AddNewCustomerVerifiation from "./pages/customers/add-new-customer/customer-verification";
import AddNewCustomerCompany from "./pages/customers/add-new-customer/customer-company";
import AddNewCustomerSalesChannel from "./pages/customers/add-new-customer/customer-sales-channels";
import EditCustomerDetailsPage from "./pages/customers/edit-customer/customer-details";
import EditCustomerVerifiationPage from "./pages/customers/edit-customer/customer-verification";
import EditCustomerCompanyPage from "./pages/customers/edit-customer/customer-company";
import EditCustomerSalesChannelPage from "./pages/customers/edit-customer/customer-sales-channels";
import AddNewInvoice from "./pages/invoices/add-invoice";
import AddNewPackageAndOffer from "./pages/plans-and-promotions/package-and-offers/add-new-package-and-offer";
import AdditionalServiceDetailsById from "./pages/additional-services/99apartment-services/service-details";
import VendorServiceDetailsById from "./pages/additional-services/vendor-services/vendor-details";
import NewBookings from "./pages/bookings/new-booking";
import EditAdminUser from "./pages/manage-admins/users/edit-user";
import AddAdminUser from "./pages/manage-admins/users/add-user";
import EditRoles from "./pages/manage-admins/roles-and-permissions/edit-roles";
import AddRoles from "./pages/manage-admins/roles-and-permissions/add-roles";
import Profile from "./pages/profile";
import Employees from "./pages/employees";
// APARTMENTS
import ApartmentTabWrapper from "./routeProtectors/wrapper/apartment";

import ApartmentsListView from "./pages/apartments";
import RoomOptionsListView from "./pages/apartments/room-options";
import AmenitiesListView from "./pages/apartments/amenities";
import ExtraOptionsListView from "./pages/apartments/extra-options";
import SafetyAndSecurityListView from "./pages/apartments/safety-and-security";
import RulesListView from "./pages/apartments/rules";

// BOOKINGS
import BookingTabWrapper from "./routeProtectors/wrapper/booking";

import BookingsCalendar from "./pages/bookings/bookings-calendar";
import AvailabilityOverview from "./pages/bookings/availability-overview";
import AllBookings from "./pages/bookings/all-bookings";
import Requests from "./pages/bookings/requests";

// BOOKINGS DETAILS
import BookingDetailTabWrapper from "./routeProtectors/wrapper/booking-detail";
import BookingDetailsById from "./pages/bookings/booking-detail/booking-by-id";
import BookingAdministrationById from "./pages/bookings/booking-detail/adminstration-by-id";

// ADDITIONAL SERVICES
import AdditionalServicesTabWrapper from "./routeProtectors/wrapper/additiona-services";

import AptAdditionalServicesList from "./pages/additional-services/99apartment-services";
import VendorServicesList from "./pages/additional-services/vendor-services";

// ADMINS MANAGEMENT
import AdminUsersTabWrapper from "./routeProtectors/wrapper/admin-users";

import AdminManagementViewAll from "./pages/manage-admins/view-all-users";
import AdminManagementViewAllRoles from "./pages/manage-admins/view-all-roles";

// PRICING
import PricingTabWrapper from "./routeProtectors/wrapper/pricing";

import PricingOverview from "./pages/pricing/pricing-overview";
import RateTable from "./pages/pricing/rates-table";
import SpecialPrices from "./pages/pricing/special-prices";
import NewPricingRestrictions from "./pages/pricing/pricing-restriction";

// PACKAGES AND OFFERS
import PlansAndPromotionsTabWrapper from "./routeProtectors/wrapper/plans-and-promotions";

import TaxRates from "./pages/plans-and-promotions/tax-rates";
import PricesTypes from "./pages/plans-and-promotions/price-types";
import Coupons from "./pages/plans-and-promotions/coupons";
import PackagesAndOffers from "./pages/plans-and-promotions/package-and-offers";

// CHAT MODULE
import ChatsTabWrapper from "./routeProtectors/wrapper/chat";

import GuestChatModule from "./pages/chat/guest";
import CustomerSuccessChatModule from "./pages/chat/customer-success.tsx";
import OwnersChatModule from "./pages/chat/owners";
import OtherStaffChatModule from "./pages/chat/other-staff";
import VendorChatModule from "./pages/chat/vendor";

// INVOICE
import InvoicesTabWrapper from "./routeProtectors/wrapper/invoices";

import ApartmentInvoice from "./pages/invoices/apartment-invoices";
import AdditionalServicesInvoice from "./pages/invoices/addition-services-invoices";
import AddRestriction from "./pages/pricing/pricing-restriction/add";
import EditRestriction from "./pages/pricing/pricing-restriction/edit";
import AddSpecialPricing from "./pages/pricing/special-prices/add";
import EditSpecialPricing from "./pages/pricing/special-prices/edit";
import ServiceTypesViewAll from "./pages/additional-services/service-types";
import LocationGroupView from "./pages/apartments/location-group";
import ReportsTabWrapper from "./routeProtectors/wrapper/reports";
import RevenueReport from "./pages/reports/revenue";
import OccupancyRankingReport from "./pages/reports/occupancy-ranking";
import DailyRoomReport from "./pages/reports/daily-room";
import OccupancyPerTimeReport from "./pages/reports/occupancy-per-time";
import EditInvoice from "./pages/invoices/edit-invoice";
import CustomerDetail from "./pages/customers/customer-detail";
// calendar views
import MaintenanceCalendar from "./pages/calendar/maintenance-calendar";
import CalendarTabWrapper from "./routeProtectors/wrapper/calendar";
import ApartmentCalendarPage from "./pages/calendar/booking-calendar";
import CustomerEngagementsTabWrapper from "./routeProtectors/wrapper/customer-engagement";
import RatingsAndReviews from "./pages/customer-engagements/ratings-and-reviews";
import Referrals from "./pages/customer-engagements/referrals";
import RequisitionRequests from "./pages/requests/requisition-requests";
import RequestsTabWrapper from "./routeProtectors/wrapper/requests";
import MaintenanceRequests from "./pages/requests/maintenance-requests";
import ViewEmployee from "./pages/employees/view employee";
import ViewMaintenanceRequest from "./pages/requests/maintenance-requests/view-maintenance/view-maintenance";
import GeneratorRuntime from "./pages/reports/generator-runtime";
import BookingsReport from "./pages/reports/bookings";
import MaintenanceExpenses from "./pages/reports/maintenance-expenses";
import BlockedDatesReasonListView from "./pages/apartments/block-dates-reason";
import RequestsCategoriesListView from "./pages/requests/requests-categories";

function App() {
  const { show } = useAppSelector((state) => state.snackbar.value);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/unauthorised" element={<Unauthorised />} />
          <Route element={<RedirectHome />}>
            <Route path="/" element={<Login />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route
              path="/auth/change-password/:email/:otp"
              element={<ChangePassword />}
            />
          </Route>
          <Route element={<PersistLogin />}>
            <Route path="/dashboard-overview" element={<DashboardOverview />} />
            {/* apartment flows wrapper */}
            <Route element={<ApartmentTabWrapper />}>
              <Route
                path="/apartments/view-all"
                element={<ApartmentsListView />}
              />
              <Route
                path="/apartments/room-options"
                element={<RoomOptionsListView />}
              />
              <Route
                path="/apartments/amenities"
                element={<AmenitiesListView />}
              />
              <Route
                path="/apartments/extra-options"
                element={<ExtraOptionsListView />}
              />
              <Route
                path="/apartments/safety-and-securities"
                element={<SafetyAndSecurityListView />}
              />
              <Route path="/apartments/rules" element={<RulesListView />} />
              <Route
                path="/apartments/location-grouping"
                element={<LocationGroupView />}
              />
              <Route
                path="/apartments/blocked-dates-reasons"
                element={<BlockedDatesReasonListView />}
              />
            </Route>

            {/* view single apartment  */}
            <Route
              path="/apartments/apartment-details/:id"
              element={<ApartmentDetail />}
            />
            <Route
              path="/apartments/apartment-caledar/:id"
              element={<CheckCalendar />}
            />
            {/* add */}
            <Route
              path="/apartments/add-apartment/apartment-details"
              element={<AddNewApartmentDetails />}
            />
            <Route
              path="/apartments/add-apartment/apartment-features"
              element={<AddNewApartmentFeatures />}
            />
            <Route
              path="/apartments/add-apartment/apartment-policies"
              element={<AddNewApartmentPolicies />}
            />
            {/* edits */}
            <Route
              path="/apartments/edit-apartment/apartment-details/:id"
              element={<EditApartmentDetails />}
            />
            <Route
              path="/apartments/edit-apartment/apartment-features/:id"
              element={<EditApartmentFeatures />}
            />
            <Route
              path="/apartments/edit-apartment/apartment-policies/:id"
              element={<EditApartmentPolicies />}
            />
            {/* apartment flows */}

            {/* bookings flows wrapper */}
            <Route element={<BookingTabWrapper />}>
              <Route path="/bookings/overview" element={<Bookings />} />
              <Route path="/bookings/calendar" element={<BookingsCalendar />} />
              <Route
                path="/bookings/availability-overview"
                element={<AvailabilityOverview />}
              />
              <Route path="/bookings/view-all" element={<AllBookings />} />
              <Route path="/bookings/requests" element={<Requests />} />
            </Route>

            {/* bookings flows wrapper */}
            <Route element={<BookingDetailTabWrapper />}>
              <Route
                path="/bookings/booking-details/:id"
                element={<BookingDetailsById />}
              />
              <Route
                path="/bookings/adminstration/booking-details/:id"
                element={<BookingAdministrationById />}
              />
            </Route>
            <Route path="/bookings/new-booking" element={<NewBookings />} />
            <Route
              path="/bookings/booking-details/edit-reservation/:id"
              element={<EditBookingReservation />}
            />
            <Route
              path="/bookings/request-details/:id"
              element={<RequestDetailsById />}
            />
            {/* <Route path="/bookings-calendar" element={<BookingsCalendar />} /> */}

            {/* additional services flows wrapper */}
            <Route element={<AdditionalServicesTabWrapper />}>
              <Route
                path="/additional-services/99apartment-services"
                element={<AptAdditionalServicesList />}
              />
              <Route
                path="/additional-services/vendor-services"
                element={<VendorServicesList />}
              />
            </Route>
            <Route
              path="/additional-services/service-types"
              element={<ServiceTypesViewAll />}
            />
            <Route
              path="/additional-services/service-details/:id"
              element={<AdditionalServiceDetailsById />}
            />
            <Route
              path="/additional-services/vendor-details/:id"
              element={<VendorServiceDetailsById />}
            />
            {/* customers flows  */}
            <Route path="/customers" element={<Customers />} />

            {/* employees flows  */}
            <Route path="/employees" element={<Employees />} />
            <Route
              path="/employees/view-employee/:id"
              element={<ViewEmployee />}
            />

            <Route
              path="/customers/customer-details/:id"
              element={<CustomerDetail />}
            />
            {/* add */}
            <Route
              path="/customers/add-customer/customer-details"
              element={<AddNewCustomerDetails />}
            />
            <Route
              path="/customers/add-customer/customer-verification"
              element={<AddNewCustomerVerifiation />}
            />
            <Route
              path="/customers/add-customer/customer-company"
              element={<AddNewCustomerCompany />}
            />
            <Route
              path="/customers/add-customer/customer-sales-channel"
              element={<AddNewCustomerSalesChannel />}
            />
            <Route
              path="/customers/edit-customer/customer-details/:id"
              element={<EditCustomerDetailsPage />}
            />
            <Route
              path="/customers/edit-customer/customer-verification/:id"
              element={<EditCustomerVerifiationPage />}
            />
            <Route
              path="/customers/edit-customer/customer-company/:id"
              element={<EditCustomerCompanyPage />}
            />
            <Route
              path="/customers/edit-customer/customer-sales-channel/:id"
              element={<EditCustomerSalesChannelPage />}
            />
            {/* customer engaements */}
            <Route element={<CustomerEngagementsTabWrapper />}>
              <Route
                path="/customer-engagements/ratings-and-reviews"
                element={<RatingsAndReviews />}
              />
              <Route
                path="/customer-engagements/referrals"
                element={<Referrals />}
              />
            </Route>

            {/* Admin management */}
            {/* admin users flows wrapper */}
            <Route element={<AdminUsersTabWrapper />}>
              <Route
                path="/admin/admin-users"
                element={<AdminManagementViewAll />}
              />
              <Route
                path="/admin/users-roles"
                element={<AdminManagementViewAllRoles />}
              />
            </Route>
            <Route path="/admin/add" element={<AddAdminUser />} />
            <Route path="/admin/edit/:id" element={<EditAdminUser />} />
            <Route path="/admin/admin-roles/add" element={<AddRoles />} />
            <Route path="/admin/admin-roles/edit/:id" element={<EditRoles />} />

            {/* pricing flows wrapper */}
            <Route element={<PricingTabWrapper />}>
              <Route path="/pricing/overview" element={<PricingOverview />} />
              <Route path="/pricing/rate-table" element={<RateTable />} />
              <Route
                path="/pricing/special-prices"
                element={<SpecialPrices />}
              />
              <Route
                path="/pricing/restrictions"
                element={<NewPricingRestrictions />}
              />
            </Route>

            <Route
              path="/pricing/add-special-price"
              element={<AddSpecialPricing />}
            />
            <Route
              path="/pricing/edit-special-price/:id"
              element={<EditSpecialPricing />}
            />
            <Route
              path="/pricing/add-restriction"
              element={<AddRestriction />}
            />
            <Route
              path="/pricing/edit-restriction/:id"
              element={<EditRestriction />}
            />
            {/* plans and promotions flows wrapper */}
            <Route element={<PlansAndPromotionsTabWrapper />}>
              <Route
                path="/plans-and-promotions/tax-rates"
                element={<TaxRates />}
              />
              <Route
                path="/plans-and-promotions/types-of-prices"
                element={<PricesTypes />}
              />
              <Route
                path="/plans-and-promotions/coupons"
                element={<Coupons />}
              />
              <Route
                path="/plans-and-promotions/packages-and-offers"
                element={<PackagesAndOffers />}
              />
            </Route>
            <Route
              path="/plans-and-promotions/package-and-offer/add-new-package-and-offer"
              element={<AddNewPackageAndOffer />}
            />
            <Route
              path="/plans-and-promotions/package-and-offer/edit-new-package-and-offer/:id"
              element={<AddNewPackageAndOffer />}
            />
            {/* requests */}
            <Route element={<RequestsTabWrapper />}>
              <Route
                path="/requests/maintenance-requests"
                element={<MaintenanceRequests />}
              />

              <Route
                path="/requests/requisition-requests"
                element={<RequisitionRequests />}
              />

              <Route
                path="/requests/categories"
                element={<RequestsCategoriesListView />}
              />
            </Route>
            <Route
              path="/requests/maintenance-requests/view-maintenance/:id"
              element={<ViewMaintenanceRequest />}
            />

            {/* calendar */}
            <Route element={<CalendarTabWrapper />}>
              <Route
                path="/calendar/maintenance-calendar"
                element={<MaintenanceCalendar />}
              />
              <Route
                path="/calendar/apartment-calendar"
                element={<ApartmentCalendarPage />}
              />
            </Route>

            {/* chats flows wrapper */}
            <Route element={<ChatsTabWrapper />}>
              <Route path="/chat/guest" element={<GuestChatModule />} />
              <Route
                path="/chat/customer-success"
                element={<CustomerSuccessChatModule />}
              />
              <Route path="/chat/owners" element={<OwnersChatModule />} />
              <Route
                path="/chat/other-staff-users"
                element={<OtherStaffChatModule />}
              />
              <Route path="/chat/vendor" element={<VendorChatModule />} />
            </Route>
            {/* invoice flow */}

            {/* invoices flows wrapper */}
            <Route element={<InvoicesTabWrapper />}>
              <Route
                path="/invoices/apartment"
                element={<ApartmentInvoice />}
              />
              <Route
                path="/invoices/additional-sevices"
                element={<AdditionalServicesInvoice />}
              />
            </Route>
            <Route path="/invoices/add-invoice" element={<AddNewInvoice />} />
            <Route
              path="/invoices/edit-invoice/:id"
              element={<EditInvoice />}
            />
            {/* reports */}
            <Route element={<ReportsTabWrapper />}>
              <Route path="/reports/revenue" element={<RevenueReport />} />
              <Route
                path="/reports/maintenance-expenses"
                element={<MaintenanceExpenses />}
              />
              <Route path="/reports/bookings" element={<BookingsReport />} />
              <Route
                path="/reports/generator-runtime"
                element={<GeneratorRuntime />}
              />
              <Route
                path="/reports/occupancy-ranking"
                element={<OccupancyRankingReport />}
              />
              <Route path="/reports/daily-room" element={<DailyRoomReport />} />
              <Route
                path="/reports/occupancy-per-time"
                element={<OccupancyPerTimeReport />}
              />
            </Route>
            <Route path="/notification" element={<Notification />} />
            <Route path="/user-profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* alert Popup */}
      <AlertModal openModal={show} />
      {/* {<SnackBar show={show} message={message} isError={isError} />} */}
    </>
  );
}

export default App;
