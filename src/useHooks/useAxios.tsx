import { useEffect } from "react";
import { axiosInstance } from "../services-hooks/base";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
// import { updateAuthentication } from "../stores/users/auth";
// import { updateNetworkError } from "../stores/appFunctionality/networkError";
import { useNavigate } from "react-router-dom";
import { clearAuthentication } from "../stores/authUser/auth";

//axios instace interceptor for access token integration and refresh tokens
const useAxios = () => {
  const navigate = useNavigate();
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
          // const newAccessToken = await axiosInstance.post("/", {
          //   refresh_token: "",
          // });
          // console.log({ oldToken: userAuth?.accessToken, newAccessToken });
          // dispatch(
          //   updateAuthentication({
          //     access_token: "",
          //     refresh_token: "",
          //   })
          // );
          // prevRequest.headers["Authorization"] = `Bearer ${""}`;
          // return axiosInstance(prevRequest);
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
