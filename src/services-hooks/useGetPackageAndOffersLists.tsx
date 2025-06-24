import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  updatePackageAndOfferList,
  addToPaginationHistory,
} from "../stores/apiData/packages-and-offers";
import { pagination } from "../types/pagination";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllPackagesAndOffers({
  page = 1,
  search = "",
  limit = 20,
  sort = "asc",
}: {
  page?: number;
  search?: string;
  limit?: number;
  sort?: "asc" | "desc" | string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.allPackagesAndOffers.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getPackageAndOffersLists = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: Number(page),
          search: search,
          limit: limitless ? 1000 : Number(limit),
          sort,
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
          dispatch(updatePackageAndOfferList({ data: foundPage?.data }));
        } else {
          const response = await axios.get(`/admin/offer?${queryString}`);
          const { offer } = response?.data?.data;
          const { data, current_page, last_page, per_page, total, from, to } =
            offer;
          const paginationDataset = {
            current_page,
            last_page,
            per_page,
            total,
            from,
            to,
            length: data?.length,
          };
          dispatch(updatePackageAndOfferList({ data }));
          dispatch(
            addToPaginationHistory({
              pagination_data: paginationDataset,
              data,
              key: queryKey,
            })
          );
          setPagination(paginationDataset);
        }
        setIsLoading(false);
      } catch (error) {
        setIsFailed(true);
      } finally {
        setIsLoading(false);
      }
    },
    [page, search, limit, sort]
  );

  useEffect(() => {
    getPackageAndOffersLists();
  }, [page, search, limit, sort]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getPackageAndOffersLists,
    pagination,
  };
}
