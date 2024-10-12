import { useEffect } from "react";
import { axiosInstance } from "../services-hooks/base";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearAuthentication,
  updateAuthentication,
} from "../stores/authUser/auth";
import { openSnackbar } from "../stores/appFunctionality/snackbar";
import refreshToken from "../services-hooks/base/refreshToken";

//axios instace interceptor for access token integration and refresh tokens
const useAxios = (disableErrorPrompt?: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { access_token } = useAppSelector(
    (state) => state.userAuthentication.value
  );

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // ----log error message using snackbar---
        const errorMessage = error?.response?.data?.message;
        // ----log error message using snackbar---
        // if (
        //   error?.response?.status === 422 ||
        //   error?.response?.status === 400 ||
        //   error?.response?.status === 500
        // ) {
        const statusMessage = error?.response?.data?.status;
        const hadUnauthenticated =
          error?.response?.data?.message
            ?.toLowerCase()
            .includes("unauthenticated") ||
          statusMessage?.toLowerCase().includes("token") ||
          error?.response?.data?.debug?.toLowerCase().includes("token");
        if (hadUnauthenticated && !prevRequest?.sent) {
          // If the request was already sent, we don't want to refresh the token
          prevRequest.sent = true;
          const { new_access_token } = await refreshToken({
            old_token: access_token,
          });
          dispatch(
            updateAuthentication({
              access_token: new_access_token,
              refresh_token: "",
            })
          );
          prevRequest.headers["Authorization"] = `Bearer ${new_access_token}`;
          return axiosInstance(prevRequest);
        } else if (hadUnauthenticated) {
          sessionStorage.removeItem(`${process.env.REACT_APP_SESSION_KEY}`);
          dispatch(clearAuthentication());
          navigate(`/?redirect=${location?.pathname}`);
          return Promise.reject(error);
        } else if (!disableErrorPrompt) {
          dispatch(
            openSnackbar({
              message: errorMessage || "Please try again later",
              isError: true,
            })
          );
          // }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);
  return axiosInstance;
};

export default useAxios;
