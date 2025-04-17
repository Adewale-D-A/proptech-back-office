import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  addToPaginationHistory,
  updateBookingsList,
} from "../stores/apiData/bookings-lists";
import { pagination } from "../types/pagination";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllBookingsLists({
  page = 1,
  start_date,
  end_date,
  sort = "asc",
  channel,
  currency,
  room_option,
  payment_method,
  status,
  search = "",
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  channel?: string;
  currency?: string;
  room_option?: string;
  payment_method?: string;
  status?: string;
  search?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.allBookingsLists.value
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [pagination, setPagination] = useState<pagination>({} as any);

  const getAllBookingstList = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { queryString, remakeRequest } = ApiQueryParamsExtractor({
        dataset: {
          page: search ? 1 : page,
          start_date: start_date,
          end_date: end_date,
          sort: sort,
          channel: channel,
          currency: currency,
          room_option: room_option,
          payment_method: payment_method,
          status: status,
          search: search,
        },
      });
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && !remakeRequest) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateBookingsList({ data: foundPage?.data }));
      } else {
        const response = await axios.get(`/admin/booking?${queryString}`);
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
        dispatch(updateBookingsList({ data }));
        if (!remakeRequest) {
          dispatch(
            addToPaginationHistory({
              pagination_data: paginationDataset,
              data: data,
            })
          );
        }
        setPagination(paginationDataset);
      }
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    start_date,
    end_date,
    sort,
    channel,
    currency,
    room_option,
    payment_method,
    status,
    search,
  ]);

  useEffect(() => {
    getAllBookingstList();
  }, [
    page,
    start_date,
    end_date,
    sort,
    channel,
    currency,
    room_option,
    payment_method,
    status,
    search,
  ]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllBookingstList,
    pagination,
  };
}
