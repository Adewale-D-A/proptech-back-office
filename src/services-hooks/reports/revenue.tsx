import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateRevenueReport } from "../../stores/apiData/reports/revenue";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetRevenueReport({
  page = 1,
  apartmentId,
  start_date,
  end_date,
  group = "",
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  apartmentId: string;
  group?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.revenueReports.value);
  const [isLoading, setIsLoading] = useState(false);
  //   const [data, setData] = useState<revenueReportList[]>([]);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getRevenueReports = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(
        start_date && end_date
          ? `/admin/report/revenue?shortlet_id=${apartmentId}&limit=20&page=${page}&start_date=${start_date}&end_date=${end_date}&group=${group}`
          : `/admin/report/revenue?shortlet_id=${apartmentId}&limit=20&page=${page}&group=${group}`
      );
      const { report } = response?.data?.data;
      const { data, current_page, last_page, per_page, total, from, to } =
        report;
      const paginationDataset = {
        current_page,
        last_page,
        per_page,
        total,
        from,
        to,
        length: data?.length,
      };
      dispatch(updateRevenueReport({ data }));
      setPagination(paginationDataset);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, apartmentId, start_date, end_date, group]);

  useEffect(() => {
    if (apartmentId) {
      getRevenueReports();
    }
  }, [page, apartmentId, start_date, end_date, group]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getRevenueReports,
    pagination,
  };
}
