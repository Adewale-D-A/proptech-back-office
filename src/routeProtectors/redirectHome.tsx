import { Navigate, Outlet } from "react-router-dom";
import OnboardingLayout from "../layouts/onboardingLayout";
import useGetAuthUser from "../services-hooks/auth/useGetAuthUser";
import Loader from "../pages/loader";

export default function RedirectHome() {
  const { data, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetAuthUser();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data?.id ? (
        <Navigate to={`/dashboard-overview`} replace />
      ) : (
        <OnboardingLayout>
          <Outlet />
        </OnboardingLayout>
      )}
    </>
  );
}
