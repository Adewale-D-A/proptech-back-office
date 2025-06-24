import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import tempAptData from "../assets/temp-api-mockup-data/vendorService.json";
import {
  addToPaginationHistory,
  updateVendorServicesList,
} from "../stores/apiData/vendor-services-lists";
import { pagination } from "../types/pagination";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllVendorServiceLists({
  page = 1,
  limit = 20,
  sort = "asc",
}: {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc" | string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.allVendorServices.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);
  const getAllVendorServiceList = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          limit: limitless ? 1000 : Number(limit),
          page: Number(page),
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
          dispatch(updateVendorServicesList({ data: foundPage?.data }));
        } else {
          // const response = await axios.post(`/institution-list?page=${page}`);
          // const responseData = response?.data?.data;
          // const institutions = response?.data?.institution;
          dispatch(updateVendorServicesList({ data: tempAptData.data }));

          // TODO: UPDATE based on backend pagination response
          //CURRENTLY: Pagination is not being returned for this dataset,
          //TEMPORARY SOLUTION: Hardcoding pagination
          // const { data, current_page, last_page, per_page, total, from, to } =
          //   responseData;
          // const paginationDataset = {
          //   current_page: 1,
          //   last_page: 1,
          //   per_page: 20,
          //   total: 4,
          //   from: 1,
          //   to: 1,
          // };
          // dispatch(update_institution({data}));
          dispatch(
            addToPaginationHistory({
              pagination_data: tempAptData.pagination,
              data: tempAptData.data,
              key: queryKey,
            })
          );
          setPagination(tempAptData.pagination);
        }
      } catch (error) {
        setIsFailed(true);
      } finally {
        setIsLoading(false);
      }
    },
    [page, limit, sort]
  );

  useEffect(() => {
    getAllVendorServiceList();
  }, [page, limit, sort]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllVendorServiceList,
    pagination,
  };
}
