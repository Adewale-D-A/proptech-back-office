import { useCallback, useEffect, useState } from "react";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { pagination } from "../../types/pagination";
import {
  addToPaginationHistory,
  updateOwnersReportReport,
} from "../../stores/apiData/reports/owners-report";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllOwnersReport({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
  search = "",
  building_id,
  shortlet_id,
  category_id,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  building_id?: string;
  shortlet_id?: string;
  category_id?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.ownersReport.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getAllOwnersReportList = useCallback(async () => {
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
          building_id,
          shortlet_id,
          category_id,
        },
      });
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && !remakeRequest) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateOwnersReportReport({ data: foundPage?.data }));
      } else {
        const response = await axios.get(`/admin/owner-report?${queryString}`);
        const { owner_reports } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          owner_reports;
        console.log({ data });
        // const paginationDataset = {
        //   current_page,
        //   last_page,
        //   per_page,
        //   total,
        //   from,
        //   to,
        //   length: data?.length,
        // };
        // dispatch(
        //   updateOwnersReportReport({
        //     data: { data: dataset, summary: summaries },
        //   })
        // );
        // if (!remakeRequest) {
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
  }, [
    page,
    start_date,
    end_date,
    sort,
    search,
    building_id,
    shortlet_id,
    category_id,
  ]);

  useEffect(() => {
    if (shortlet_id) {
      getAllOwnersReportList();
    }
  }, [
    page,
    start_date,
    end_date,
    sort,
    search,
    building_id,
    shortlet_id,
    category_id,
  ]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllOwnersReportList,
    pagination,
  };
}
