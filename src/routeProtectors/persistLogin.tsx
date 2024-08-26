import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { useEffect, useState } from "react";
import { updateAuthentication } from "../stores/authUser/auth";
import Loader from "../pages/loader";
import MainLayout from "../layouts";

export default function PersistLogin() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useAppSelector((state) => state.userAuthentication.value);
  const token = sessionStorage.getItem(`${process.env.REACT_APP_SESSION_KEY}`);

  // get token from session and update app state
  useEffect(() => {
    if (token) {
      dispatch(
        updateAuthentication({ access_token: token, refresh_token: "" })
      );
    }
    setIsLoading(false);
  }, [token]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : status ? (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
