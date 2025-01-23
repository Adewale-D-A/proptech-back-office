import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { requisitionRequest } from "../types/apiData/requisition-request";
import sampleRequesitionsData from "../assets/temp-api-mockup-data/requisition-request.json";

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
      //   const response = await axios.get(`/admin/requistion-request/${id}`);
      //   const data = response?.data?.data;
      // TODO: Use response from API and remove dummy data response mockup
      const dummyData = sampleRequesitionsData?.data.find(
        (item) => String(item?.id) === String(id)
      ) as any;
      if (dummyData?.id) {
        setData(dummyData);
      }
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
