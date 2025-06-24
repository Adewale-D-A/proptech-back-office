import { useCallback, useEffect, useState } from "react";
import {
  addToPaginationHistory,
  updateLatestReservationList,
} from "../../stores/apiData/bookings/lastest-reservation";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetLatestReservation({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
  search = "",
  limit = 20,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  limit?: number;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.latestRestervation.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getLatestReservation = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: Number(page),
          start_date: start_date,
          end_date: end_date,
          sort: sort,
          limit: limitless ? 1000 : Number(limit),
          search: search,
        };
        const queryKey = JSON.stringify(queryDataset);
        const { queryString } = ApiQueryParamsExtractor({
          dataset: queryDataset,
          sortRefetchKeyword: "asc",
        });
        //check store if this requested data has been saved previously and retirve it
        //if not, make a new request and save into store
        const foundPage = store_pagination.find(
          (item) => item?.key === queryKey
        );
        if (foundPage) {
          setPagination(foundPage?.pagination_data);
          dispatch(updateLatestReservationList({ data: foundPage?.data }));
        } else {
          const response = await axios.get(
            `/admin/booking/latest-reservation?${queryString}`
          );
          const { bookings } = response?.data?.data;
          const { data, current_page, last_page, per_page, total, from, to } =
            bookings;
          const paginationDataset = {
            current_page,
            last_page,
            per_page,
            total,
            from,
            to,
            length: data?.length,
          };
          dispatch(updateLatestReservationList({ data }));
          dispatch(
            addToPaginationHistory({
              pagination_data: paginationDataset,
              data: data,
              key: queryKey,
            })
          );
          setPagination(paginationDataset);
        }
      } catch (error) {
        setIsFailed(true);
      } finally {
        setIsLoading(false);
      }
    },
    [page, start_date, end_date, sort, search, limit]
  );

  useEffect(() => {
    getLatestReservation();
  }, [page, start_date, end_date, sort, search, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getLatestReservation,
    pagination,
  };
}
