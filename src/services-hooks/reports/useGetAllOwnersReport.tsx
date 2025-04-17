import { useCallback, useEffect, useState } from "react";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { pagination } from "../../types/pagination";
import { updateOwnersReport } from "../../stores/apiData/reports/owners-report";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllOwnersReport({
  page = 1,
  start_date,
  end_date,
  sort = "asc",
  search = "",
  building_id,
  shortlet_id,
  expense_category_id,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  building_id?: string;
  shortlet_id?: string;
  expense_category_id?: string;
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
          expense_category_id,
        },
      });
      const response = await axios.get(`/admin/owner-report?${queryString}`);
      const { owner_reports } = response?.data?.data;
      const { data, current_page, last_page, per_page, total, from, to } =
        owner_reports;
      const paginationDataset = {
        current_page,
        last_page,
        per_page,
        total,
        from,
        to,
        length: data?.length,
      };
      dispatch(
        updateOwnersReport({
          data,
        })
      );
      setPagination(paginationDataset);
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
    expense_category_id,
  ]);

  useEffect(() => {
    getAllOwnersReportList();
  }, [
    page,
    start_date,
    end_date,
    sort,
    search,
    building_id,
    shortlet_id,
    expense_category_id,
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
