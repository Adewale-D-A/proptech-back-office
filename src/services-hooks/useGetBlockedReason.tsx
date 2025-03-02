import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { blockedReason } from "../types/apiData/blocked-reason";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetBlockedReason({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<blockedReason>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const blockedReason = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/block-date-reason/${id}`);
      const { reason } = response?.data?.data;
      setData(reason);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      blockedReason();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: blockedReason,
  };
}
