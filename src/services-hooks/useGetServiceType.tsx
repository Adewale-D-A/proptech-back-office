import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { serviceType } from "../types/apiData/serviceTypes";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetServiceType({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<serviceType>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const serviceType = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/service-type/${id}`);
      const { serviceType } = response?.data?.data;
      setData(serviceType);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      serviceType();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: serviceType,
  };
}
