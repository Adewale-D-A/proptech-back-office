import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { building } from "../../types/apiData/apartment/buildings";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetBuilding({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<building>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const building = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/building/${id}`);
      const { building } = response?.data?.data;
      setData(building);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      building();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: building,
  };
}
