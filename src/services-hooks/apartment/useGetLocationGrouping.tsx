import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { locationGrouping } from "../../types/apiData/apartment/locationGroupings";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetlocationGrouping({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<locationGrouping>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const locationGrouping = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/location-group/${id}`);
      const { location_group } = response?.data?.data;
      setData(location_group);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      locationGrouping();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: locationGrouping,
  };
}
