import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { amenity } from "../types/apiData/amenities";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAmenity({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<amenity>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getAmenity = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/amenity/${id}`);
      const { amenity } = response?.data?.data;
      setData(amenity);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getAmenity();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAmenity,
  };
}
