import { useCallback, useEffect, useState } from "react";
import {
  addToPaginationHistory,
  updateArrivingReservationList,
} from "../../stores/apiData/bookings/arriving-reservation";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import useAxios from "../../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetArrivingReservation({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
  search = "",
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
}) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.arrivingReservation.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  }>({} as any);

  const getArrivingReservation = useCallback(async () => {
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
        dispatch(updateArrivingReservationList({ data: foundPage?.data }));
      } else {
        const response = await axios.get(
          start_date && end_date
            ? `/admin/booking/arriving-reservation?sort=${sort}&limit=20&search=${
                search || ""
              }&page=${page}&start_date=${start_date}&end_date=${end_date}`
            : `/admin/booking/arriving-reservation?sort=${sort}&limit=20&search=${
                search || ""
              }&page=${page}`
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
    getArrivingReservation();
  }, [page, start_date, end_date, sort, search]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getArrivingReservation,
    pagination,
  };
}
