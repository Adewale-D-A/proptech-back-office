import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateSalesChannel } from "../../stores/apiData/dahsboards/sales-channels";

export default function useGetSalesChannels({
  start_date,
  end_date,
}: {
  start_date?: string;
  end_date?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector((state) => state.salesChannels.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getSalesChannels = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    const currentYear = new Date().getFullYear();
    try {
      const response = await axios.get(
        start_date && end_date
          ? `/admin/dashboard/sales-channels?start_date=${start_date}&end_date=${end_date}`
          : `/admin/dashboard/sales-channels?start_date=${currentYear}-01-01&end_date=${currentYear}-12-30`
      );
      const { sales_channel } = response?.data?.data;
      dispatch(updateSalesChannel(sales_channel));
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [start_date, end_date]);

  useEffect(() => {
    if ((start_date && end_date) || !status) {
      //check if stored data is used or new request is fetched. Also check start date and end date has been provided to load the new data
      getSalesChannels();
    }
  }, [status, start_date, end_date]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getSalesChannels,
  };
}
