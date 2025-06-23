import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { additionalService } from "../types/apiData/additionalServices";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAdditionalServiceById(id?: string) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [data, setData] = useState<additionalService>({} as any);

  const getAdditionalService = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/additional-service/${id}`);
      const data = response?.data?.data;
      setData(data);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getAdditionalService();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAdditionalService,
  };
}
