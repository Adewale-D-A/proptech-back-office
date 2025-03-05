import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { requisitionRequest } from "../types/apiData/requisition-request";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetRequisitionRequest({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<requisitionRequest>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getRequisitionRequest = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/requisition-request/${id}`);
      const { requisition_request } = response?.data?.data;
      setData(requisition_request);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getRequisitionRequest();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getRequisitionRequest,
  };
}
