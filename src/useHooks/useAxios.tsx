import { useEffect } from "react";
import { axiosInstance } from "../services-hooks/base";
import { useAppDispatch } from "../stores/hooks";
import { useLocation } from "react-router-dom";

import { openSnackbar } from "../stores/appFunctionality/snackbar";
import refreshToken from "../services-hooks/base/refreshToken";
import extractErrMssg from "../utils/extractErrMssg";
import { updateToken } from "../stores/authUser/auth";
import signOut from "../utils/auth/signOut";
import extractToken from "../utils/auth/extractToken";

const useAxios = (disableErrorPrompt?: boolean) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { token } = extractToken();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        // console.log({ token });
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;
        // ----log error message using snackbar---
        const errMssg = extractErrMssg(error?.response?.data);
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
        if (hadUnauthenticated && !originalRequest._retry) {
          // If the request was already sent, we don't want to refresh the token
          originalRequest._retry = true;
          const { new_access_token } = await refreshToken({
            old_token: token,
          });
          dispatch(updateToken(new_access_token || token));
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${new_access_token}`;
          return axiosInstance(originalRequest);
        } else if (hadUnauthenticated) {
          // sessionStorage.removeItem(`${process.env.REACT_APP_SESSION_KEY}`);
          // dispatch(clearAuthentication());
          // navigate(`/?redirect=${location?.pathname}`);
          signOut(location?.pathname);
          return Promise.reject(error);
        } else if (!disableErrorPrompt) {
          dispatch(
            openSnackbar({
              message: errMssg || "Please try again later",
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
  }, [token]);
  return axiosInstance;
};

export default useAxios;
