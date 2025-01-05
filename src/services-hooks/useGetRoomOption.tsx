import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { roomOption } from "../types/apiData/roomOption";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetRoomOption({ id }: { id?: string }) {
  const axios = useAxios();
  const [data, setData] = useState<roomOption>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getRoomOption = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/room-option/${id}`);
      const { roomOption } = response?.data?.data;
      setData(roomOption);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getRoomOption();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getRoomOption,
  };
}
