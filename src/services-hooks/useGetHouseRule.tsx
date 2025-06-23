import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { amenity } from "../types/apiData/amenities";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetHouseRule({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<amenity>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getHouseRule = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/rule/${id}`);
      const { rule } = response?.data?.data;
      setData(rule);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getHouseRule();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getHouseRule,
  };
}
