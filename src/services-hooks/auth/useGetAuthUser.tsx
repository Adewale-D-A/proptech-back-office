import { useCallback, useEffect, useState } from "react";
import Criptic from "../../utils/criptic";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateCurrrentAuthUser } from "../../stores/authUser/auth";

const cryptographer = new Criptic();
const authProfileKey = process.env.REACT_APP_AUTH_PROFILE_KEY || "";
const authKey = process.env.REACT_APP_AUTH_KEY || "";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetAuthUser() {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector(
    (state) => state.userAuthentication.value
  );

  // decrypt user data (ID and profile data)
  const authCredentials = localStorage.getItem(authKey) || "";
  const profileCredentials = localStorage.getItem(authProfileKey) || "";
  const decryptAuthCredentials = cryptographer.decrypt(
    authKey,
    authCredentials
  );
  const decryptProfileCredentials = cryptographer.decrypt(
    authProfileKey,
    profileCredentials
  );
  const { token } = JSON.parse(decryptAuthCredentials);
  const profileData = JSON.parse(decryptProfileCredentials);

  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const getAuthUser = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      if (profileData?.userType) {
        dispatch(updateCurrrentAuthUser({ user: profileData }));
      } else {
        const response = await axios.get(`/admin`);
        const profile = response?.data?.data?.admin;
        const strigifiedProfile = JSON.stringify(profile);
        const encryptedProfile = cryptographer.encrypt(
          authProfileKey,
          strigifiedProfile
        );
        localStorage.setItem(authProfileKey, encryptedProfile);
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
  }, [profileData, token]);

  useEffect(() => {
    if (token && !status) {
      getAuthUser();
    } else {
      setIsLoading(false);
    }
  }, [profileData, status, token]);

  return {
    data: user,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAuthUser,
  };
}
