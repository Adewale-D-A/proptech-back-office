import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { packagesAndOffers } from "../types/apiData/packagesAndOffers";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetOffer({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<packagesAndOffers>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getOffer = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/offer/${id}`);
      const { offer } = response?.data?.data;
      setData(offer);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getOffer();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getOffer,
  };
}
