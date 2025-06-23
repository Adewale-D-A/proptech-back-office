import { useCallback, useEffect, useState } from "react";
import {
  addToPaginationHistory,
  updateArrivingReservationList,
} from "../../stores/apiData/bookings/arriving-reservation";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetArrivingReservation({
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
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.arrivingReservation.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getArrivingReservation = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: Number(page),
          start_date: start_date,
          end_date: end_date,
          sort: "asc",
          search: search,
          limit: limitless ? 1000 : Number(limit),
        };
        const queryKey = JSON.stringify(queryDataset);
        const { queryString, remakeRequest } = ApiQueryParamsExtractor({
          dataset: queryDataset,
          sortRefetchKeyword: "desc",
        });
        //check store if this requested data has been saved previously and retirve it
        //if not, make a new request and save into store
        const foundPage = store_pagination.find(
          (item) => item?.key === queryKey
        );
        if (foundPage) {
          setPagination(foundPage?.pagination_data);
          dispatch(updateArrivingReservationList({ data: foundPage?.data }));
        } else {
          const response = await axios.get(
            `/admin/booking/arriving-reservation?${queryString}`
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
          dispatch(updateArrivingReservationList({ data }));
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
    getArrivingReservation();
  }, [page, start_date, end_date, sort, search, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getArrivingReservation,
    pagination,
  };
}
