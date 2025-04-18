import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { canecllationPolicy } from "../../types/apiData/apartment/cancellation-policy";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetCancellationPolicy({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<canecllationPolicy>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const cancellationPolicy = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/cancellation-policy/${id}`);
      const { cancellation_policy } = response?.data?.data;
      setData(cancellation_policy);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      cancellationPolicy();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: cancellationPolicy,
  };
}
