import { useCallback, useEffect, useState } from "react";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { pagination } from "../../types/pagination";
import { updateBookingsReport,  addToPaginationHistory } from "../../stores/apiData/reports/bookings-report";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllBookingReports({
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
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.bookingsReportReports.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getAllCustomerstList = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
            const { queryString, remakeRequest } = ApiQueryParamsExtractor({
              dataset: {
                page: page,
                start_date: start_date,
                end_date: end_date,
              },
            });
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
            if (foundPage && !remakeRequest && !(sort === "asc")) {
              setPagination(foundPage?.pagination_data);
                                                         dispatch(updateBookingsReport({ data: foundPage?.data }));
            } else {
                    // const response = await axios.get(`/admin/booking?${queryString}`);
                    // const { bookings } = response?.data?.data;
                    // const { data, current_page, last_page, per_page, total, from, to } =
                    //   bookings;
                    // const paginationDataset = {
                    //   current_page,
                    //   last_page,
                    //   per_page,
                    //   total,
                    //   from,
                    //   to,
                    //   length: data?.length,
                    // };
                    // dispatch(updateBookingsList({ data }));
                    // if (!search) {
                    //   dispatch(
                    //     addToPaginationHistory({
                    //       pagination_data: paginationDataset,
                    //       data: data,
                    //     })
                    //   );
                    // }
                    // setPagination(paginationDataset);
      }
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, start_date, end_date, sort, search]);

  useEffect(() => {
    getAllCustomerstList();
  }, [page, start_date, end_date, sort, search]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllCustomerstList,
    pagination,
  };
}
