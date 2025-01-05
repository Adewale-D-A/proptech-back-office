import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  addToPaginationHistory,
  updateAdminsList,
} from "../stores/apiData/admins-list";
import useAxios from "../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllAdmins({
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
  } = useAppSelector((state) => state.allAdminsLists.value);
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

  const getAllAdmins = useCallback(async () => {
    try {
      setIsLoading(true);
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
        dispatch(updateAdminsList({ data: foundPage?.data }));
      } else {
        const response = await axios.get(
          start_date && end_date
            ? `/admin/admins?sort=${sort}&limit=20&search=${
                search || ""
              }&page=${page}&start_date=${start_date}&end_date=${end_date}`
            : `/admin/admins?sort=${sort}&limit=20&search=${
                search || ""
              }&page=${page}`
        );
        const { admins } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          admins;
        const paginationDataset = {
          current_page,
          last_page,
          per_page,
          total,
          from,
          to,
          length: data?.length,
        };
        dispatch(updateAdminsList({ data }));
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
  }, [page, start_date, end_date, sort, search]);

  useEffect(() => {
    getAllAdmins();
  }, [page, start_date, end_date, sort, search]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllAdmins,
    pagination,
  };
}
