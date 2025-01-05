import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { restriction } from "../../types/apiData/restrictions";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetRestriction({ id }: { id?: string }) {
  const axios = useAxios();
  const [data, setData] = useState<restriction>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getRestriction = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/restriction/${id}`);
      const { restriction } = response?.data?.data;
      setData(restriction);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getRestriction();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getRestriction,
  };
}
