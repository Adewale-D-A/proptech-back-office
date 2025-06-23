import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { roomOption } from "../types/apiData/roomOption";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetRoomOption({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<roomOption>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getRoomOption = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/room-option/${id}`);
      const { roomOption } = response?.data?.data;
      setData(roomOption);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
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
