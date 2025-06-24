import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { roles } from "../types/apiData/roles";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetRole({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<roles>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getRole = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/roles/${id}`);
      const { role } = response?.data?.data;
      setData(role);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getRole();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getRole,
  };
}
