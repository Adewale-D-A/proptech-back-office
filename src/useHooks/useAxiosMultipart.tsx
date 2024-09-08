import { useEffect } from "react";
import { axiosMultipartInstance } from "../services-hooks/base";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
// import { updateAuthentication } from "../stores/users/auth";
// import { updateNetworkError } from "../stores/appFunctionality/networkError";
import { useNavigate } from "react-router-dom";
import { clearAuthentication } from "../stores/authUser/auth";

//axios instace interceptor for access token integration and refresh tokens
const useAxiosMultipart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        if (error?.response?.status === 401) {
          const hadUnauthenticated = error?.response?.data?.message
            ?.toLowerCase()
            .includes("unauthenticated");
          if (hadUnauthenticated) {
            sessionStorage.removeItem(`${process.env.REACT_APP_SESSION_KEY}`);
            dispatch(clearAuthentication());
            navigate("/");
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosMultipartInstance.interceptors.request.eject(requestIntercept);
      axiosMultipartInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);
  return axiosMultipartInstance;
};

export default useAxiosMultipart;
