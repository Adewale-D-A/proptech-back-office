import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { extraOption } from "../types/apiData/extraOption";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetExtraOption({ id }: { id?: string }) {
  const axios = useAxios();
  const [data, setData] = useState<extraOption>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getExtraOption = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/extra-option/${id}`);
      const { extraOption } = response?.data?.data;
      setData(extraOption);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getExtraOption();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getExtraOption,
  };
}
