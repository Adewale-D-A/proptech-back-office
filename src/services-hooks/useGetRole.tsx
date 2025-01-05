import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { roles } from "../types/apiData/roles";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetRole({ id }: { id?: string }) {
  const axios = useAxios();
  const [data, setData] = useState<roles>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getRole = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/roles/${id}`);
      const { role } = response?.data?.data;
      setData(role);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
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
