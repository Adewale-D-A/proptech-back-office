import { Navigate, Outlet } from "react-router-dom";
import Loader from "../pages/loader";
import MainLayout from "../layouts";
import useGetAuthUser from "../services-hooks/auth/useGetAuthUser";

export default function PersistLogin() {
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetAuthUser();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data?.id ? (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
