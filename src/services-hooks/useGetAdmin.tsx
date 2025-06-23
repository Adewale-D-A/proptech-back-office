import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { admin } from "../types/apiData/admins";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAdmin({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<admin>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getAdmin = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/admins/${id}`);
      const { admin } = response?.data?.data;
      setData(admin);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getAdmin();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAdmin,
  };
}
