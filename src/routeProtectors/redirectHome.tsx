import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import OnboardingLayout from "../layouts/onboardingLayout";

export default function RedirectHome() {
  const { status } = useAppSelector((state) => state.userProfile.value);
  const { status: authenticated } = useAppSelector(
    (state) => state.userAuthentication.value
  );

  return (
    <>
      {status && authenticated ? (
        <Navigate to={`/dashboard`} replace />
      ) : (
        <OnboardingLayout>
          <Outlet />
        </OnboardingLayout>
      )}
    </>
  );
}
