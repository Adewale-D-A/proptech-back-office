import { useEffect } from "react";
import { axiosMultipartInstance } from "../services-hooks/base";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
// import { updateAuthentication } from "../stores/users/auth";
// import { updateNetworkError } from "../stores/appFunctionality/networkError";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearAuthentication,
  updateAuthentication,
  // updateAuthentication,
} from "../stores/authUser/auth";
import { openSnackbar } from "../stores/appFunctionality/snackbar";

//axios instace interceptor for access token integration and refresh tokens
const useAxiosMultipart = (disableErrorPrompt?: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { access_token } = useAppSelector(
    (state) => state.userAuthentication.value
  );

  useEffect(() => {
    const requestIntercept = axiosMultipartInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosMultipartInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        // ----log error message using snackbar---
        const errorMessage = error?.response?.data?.message;
        if (!disableErrorPrompt) {
          dispatch(
            openSnackbar({
              message: errorMessage || "Please try again later",
              isError: true,
            })
          );
        }
        // ----log error message using snackbar---
        if (
          error?.response?.status === 422 ||
          error?.response?.status === 500
        ) {
          const statusMessage = error?.response?.data?.status;
          const hadUnauthenticated =
            error?.response?.data?.message
              ?.toLowerCase()
              .includes("unauthenticated") ||
            statusMessage?.toLowerCase().includes("token");
          if (hadUnauthenticated && !prevRequest?.sent) {
            // If the request was already sent, we don't want to refresh the token
            prevRequest.sent = true;
            const refreshResponse = await axiosMultipartInstance.post(
              "/auth/admin/refresh"
            );
            const { access_token: new_access_token } =
              refreshResponse?.data?.data;
            console.log({ oldToken: access_token, new_access_token });
            dispatch(
              updateAuthentication({
                access_token: new_access_token,
                refresh_token: "",
              })
            );
            prevRequest.headers["Authorization"] = `Bearer ${new_access_token}`;
            return axiosMultipartInstance(prevRequest);
          } else if (hadUnauthenticated) {
            sessionStorage.removeItem(`${process.env.REACT_APP_SESSION_KEY}`);
            dispatch(clearAuthentication());
            navigate(`/?redirect=${location?.pathname}`);
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosMultipartInstance.interceptors.request.eject(requestIntercept);
      axiosMultipartInstance.interceptors.response.eject(responseIntercept);
    };
  }, [location]);
  return axiosMultipartInstance;
};

export default useAxiosMultipart;
