import { useCallback, useEffect, useState } from "react";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import { ownerReportSpreadsheet } from "../../types/apiData/reports";
import reformOwnerSpreadsheet from "../../utils/reform-owners-spreadsheet";
import getMonthStartEndDates from "../../utils/start-end-dates-generator";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllOwnersReportSpreadsheet({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
  search = "",
  building_id,
  apartment_id,
  expense_category_id,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  building_id?: string;
  apartment_id?: string;
  expense_category_id?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [data, setData] = useState<ownerReportSpreadsheet>({} as any);
  const [pagination, setPagination] = useState<pagination>({} as any);

  const getAllOwnersReportSpreadsheetList = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const { queryString, remakeRequest } = ApiQueryParamsExtractor({
        dataset: {
          page: page,
          start_date: start_date
            ? getMonthStartEndDates(
                1,
                Number(start_date?.split("-")?.[0] || undefined)
              )?.start
            : "",
          end_date: end_date
            ? getMonthStartEndDates(
                12,
                Number(start_date?.split("-")?.[0] || undefined)
              )?.end
            : "",
          building_id,
          apartment_id,
          expense_category_id,
        },
      });
      const response = await axios.get(
        `/admin/owner-report/spreadsheet?${queryString}`
      );
      const data = response?.data?.data;
      const result = reformOwnerSpreadsheet(data);
      setData(result || []);
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
    apartment_id,
    expense_category_id,
  ]);

  useEffect(() => {
    if (apartment_id) {
      getAllOwnersReportSpreadsheetList();
    }
  }, [
    page,
    start_date,
    end_date,
    sort,
    search,
    building_id,
    apartment_id,
    expense_category_id,
  ]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllOwnersReportSpreadsheetList,
    pagination,
  };
}
