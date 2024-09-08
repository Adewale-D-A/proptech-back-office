import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageNotFound from "./pages/404";
import Login from "./pages/login";
import ResetPassword from "./pages/reset-passoword";
import ChangePassword from "./pages/reset-passoword/change-password";
// import SnackBar from "./components/snackbar";
import { useAppSelector } from "./stores/hooks";
import Unauthorised from "./pages/unauthorised";
import AlertModal from "./components/infoModal";
import RedirectHome from "./routeProtectors/redirectHome";
import PersistLogin from "./routeProtectors/persistLogin";
import Notification from "./pages/notification";
import Reports from "./pages/reports";
import Invoices from "./pages/invoices";
import Chat from "./pages/chat";
import PlansAndPromotions from "./pages/plans-and-promotions";
import Pricing from "./pages/pricing";
import Customers from "./pages/customers";
import AdditionalServices from "./pages/additional-services";
import Bookings from "./pages/bookings";
import Apartments from "./pages/apartments";
import DashboardOverview from "./pages/dashboard-overview";
import ApartmentDetail from "./pages/apartments/apartment-details";
import EditApartmentDetails from "./pages/apartments/edit-apartment/apartment-detail";
import EditApartmentFeatures from "./pages/apartments/edit-apartment/apartment-features";
import EditApartmentPolicies from "./pages/apartments/edit-apartment/apartment-policy";
import AddNewApartmentDetails from "./pages/apartments/new-apartment/apartment-detail";
import AddNewApartmentFeatures from "./pages/apartments/new-apartment/apartment-features";
import AddNewApartmentPolicies from "./pages/apartments/new-apartment/apartment-policy";

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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/change-password/:email/:otp"
              element={<ChangePassword />}
            />
          </Route>
          <Route element={<PersistLogin />}>
            <Route path="/dashboard-overview" element={<DashboardOverview />} />
            {/* apartment flows */}
            <Route path="/apartments" element={<Apartments />} />
            {/* view single apartment  */}
            <Route
              path="/apartments-details/:id"
              element={<ApartmentDetail />}
            />
            {/* add */}
            <Route
              path="/add-apartment/apartment-details"
              element={<AddNewApartmentDetails />}
            />
            <Route
              path="/add-apartment/apartment-features"
              element={<AddNewApartmentFeatures />}
            />
            <Route
              path="/add-apartment/apartment-policies"
              element={<AddNewApartmentPolicies />}
            />
            {/* edits */}
            <Route
              path="/edit-apartment/apartment-details/:id"
              element={<EditApartmentDetails />}
            />
            <Route
              path="/edit-apartment/apartment-features/:id"
              element={<EditApartmentFeatures />}
            />
            <Route
              path="/edit-apartment/apartment-policies/:id"
              element={<EditApartmentPolicies />}
            />
            {/* apartment flows */}

            <Route path="/bookings" element={<Bookings />} />
            <Route
              path="/additional-services"
              element={<AdditionalServices />}
            />
            <Route path="/customers" element={<Customers />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/plans-and-promotions"
              element={<PlansAndPromotions />}
            />
            <Route path="/chat" element={<Chat />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/notification" element={<Notification />} />
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
