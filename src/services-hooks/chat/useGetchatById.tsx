import { useCallback, useEffect, useState } from "react";
import { chatHistory } from "../../types/apiData/chat";
import useAxios from "../../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetChatById({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: true });
  const [data, setData] = useState<chatHistory[]>([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getChatById = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/chat/${id}`);
      const result = response?.data?.data;
      const { data, current_page, last_page, per_page, total, from, to } =
        result;
      // const paginationDataset = {
      //   current_page,
      //   last_page,
      //   per_page,
      //   total,
      //   from,
      //   to,
      //   length: data?.length,
      // };
      setData(data);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getChatById();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getChatById,
  };
}
