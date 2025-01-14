import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  addToPaginationHistory,
  updateBookingsList,
} from "../stores/apiData/bookings-lists";
import { pagination } from "../types/pagination";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllBookingsLists({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
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
  channel?: "website";
  currency?: "NGN" | "USD";
  room_option?: number;
  payment_method?: "paystack" | "stripe" | "website" | "admin";
  status?: "Awaiting Payment";
  search?: string;
}) {
  const axios = useAxios();
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
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (
        foundPage &&
        !(start_date && end_date) &&
        !(sort === "asc") &&
        !search
      ) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateBookingsList({ data: foundPage?.data }));
      } else {
        const response = await axios.get(
          start_date && end_date
            ? `/admin/booking?sort=${sort}&limit=20&page=${page}&start_date=${start_date}&end_date=${end_date}`
            : `/admin/booking?sort=${sort}&limit=20&page=${page}&search=${search}`
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
        dispatch(updateBookingsList({ data }));
        if (!search) {
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
  }, [page, start_date, end_date, sort, search]);

  useEffect(() => {
    getAllBookingstList();
  }, [page, start_date, end_date, sort, search]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllBookingstList,
    pagination,
  };
}
