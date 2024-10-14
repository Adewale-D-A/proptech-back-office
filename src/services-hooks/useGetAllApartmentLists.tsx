import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  addToPaginationHistory,
  updateApartmentList,
} from "../stores/apiData/apartment-lists";
import useAxios from "../useHooks/useAxios";
import { pagination } from "../types/pagination";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllApartmentLists({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
}) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.allAparmentLists.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);
  const getAllApartmentList = useCallback(async () => {
    try {
      setIsLoading(true);
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && !(start_date && end_date) && !(sort === "asc")) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateApartmentList({ data: foundPage?.data }));
      } else {
        const response = await axios.post(
          start_date && end_date
            ? `/admin/shortlet/get-all?sort=${sort}&limit=20&page=${page}&start_date=${start_date}&end_date=${end_date}`
            : `/admin/shortlet/get-all?sort=${sort}&limit=20&page=${page}`
        );
        const { shortlet } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          shortlet;
        const paginationDataset = {
          current_page,
          last_page,
          per_page,
          total,
          from,
          to,
          length: data?.length,
        };
        dispatch(updateApartmentList({ data }));
        dispatch(
          addToPaginationHistory({
            pagination_data: paginationDataset,
            data: data,
          })
        );
        setPagination(paginationDataset);
      }
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [page, start_date, end_date, sort]);

  useEffect(() => {
    getAllApartmentList();
  }, [page, start_date, end_date, sort]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllApartmentList,
    pagination,
  };
}
