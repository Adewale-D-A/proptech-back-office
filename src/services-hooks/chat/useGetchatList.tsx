import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateChatList } from "../../stores/apiData/chat-list";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetChatList({
  page = 1,
  sort = "asc",
  limit = 20,
}: {
  page?: number;
  sort?: "desc" | "asc" | string;
  limit?: number;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.chatList.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getChatList = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      try {
        const queryDataset = {
          page: Number(page),
          sort,
          limit: limitless ? 1000 : Number(limit),
        };
        const queryKey = JSON.stringify(queryDataset);
        const { queryString } = ApiQueryParamsExtractor({
          dataset: queryDataset,
        });
        //check store if this requested data has been saved previously and retirve it
        //if not, make a new request and save into store
        const foundPage = store_pagination.find(
          (item) => item?.key === queryKey
        );
        if (foundPage) {
          setPagination(foundPage?.pagination_data);
          dispatch(updateChatList({ data: foundPage?.data }));
        } else {
          const response = await axios.get(`/admin/chat?${queryString}}`);
          const chat = response?.data?.data;
          dispatch(updateChatList({ data: chat }));
        }
        setIsLoading(false);
      } catch (error) {
        setIsFailed(true);
      }
    },
    [page, limit, sort]
  );

  useEffect(() => {
    getChatList();
  }, [page, limit, sort]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getChatList,
    pagination,
  };
}
