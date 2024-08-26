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
import Dashboard from "./pages/dashboard";
import PersistLogin from "./routeProtectors/persistLogin";

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
            <Route path="/dashboard" element={<Dashboard />} />
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
