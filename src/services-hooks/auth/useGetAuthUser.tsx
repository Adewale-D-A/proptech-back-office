import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateCurrrentAuthUser } from "../../stores/authUser/auth";
import storeProfile from "../../utils/auth/storeProfile";
import extractToken from "../../utils/auth/extractToken";
import extractProfile from "../../utils/auth/extractProfile";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAuthUser() {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector(
    (state) => state.userAuthentication.value
  );

  // decrypt user data (ID and profile data)
  const { token } = extractToken();
  const profileData = extractProfile();

  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const getAuthUser = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      if (profileData?.id) {
        dispatch(updateCurrrentAuthUser({ user: profileData, token }));
      } else {
        const response = await axios.get(`/admin`);
        const profile = response?.data?.data?.admin;
        storeProfile({ profile });
        dispatch(
          updateCurrrentAuthUser({
            user: profile,
            token: token,
          })
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [token, profileData]);

  useEffect(() => {
    if (token && !status) {
      getAuthUser();
    } else {
      setIsLoading(false);
    }
  }, [token, status]);

  return {
    data: user,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAuthUser,
  };
}
