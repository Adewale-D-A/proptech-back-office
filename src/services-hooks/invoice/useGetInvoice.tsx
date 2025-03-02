import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { invoice } from "../../types/apiData/invoice";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetInvoice({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<invoice>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getInvoice = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/invoice/${id}`);
      const { invoice } = response?.data?.data;
      setData(invoice);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getInvoice();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getInvoice,
  };
}
