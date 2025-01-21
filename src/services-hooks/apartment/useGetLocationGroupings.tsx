import { useCallback, useEffect, useState } from "react";

import { pagination } from "../../types/pagination";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  addToPaginationHistory,
  updateLocationGroupingList,
} from "../../stores/apiData/apartment/location-groupings";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetLocationGroupings({
  page = 1,
  search = "",
}: {
  page?: number;
  search?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.lcoationgGrouping.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getLocationGroupings = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && !search) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateLocationGroupingList({ data: foundPage?.data }));
      } else {
        const response = await axios.get(
          `/admin/location-group?limit=20&search=${search || ""}&page=${page}`
        );
        const { location_groups } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          location_groups;
        const paginationDataset = {
          current_page,
          last_page,
          per_page,
          total,
          from,
          to,
          length: data?.length,
        };
        dispatch(updateLocationGroupingList({ data }));
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
  }, [page, search]);

  useEffect(() => {
    getLocationGroupings();
  }, [page, search]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getLocationGroupings,
    pagination,
  };
}
