import { useCallback, useEffect, useState } from "react";
import { chatHistory } from "../../types/apiData/chat";
import useAxios from "../../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetChatById({ id }: { id?: string }) {
  const axios = useAxios();
  const [data, setData] = useState<chatHistory[]>([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getChatById = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/chat/${id}`);
      console.log({ response });
      setData([]);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
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
