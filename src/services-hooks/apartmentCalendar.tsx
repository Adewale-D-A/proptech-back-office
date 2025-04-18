import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";
import ApartmentsCalendarDataTranslator from "../utils/apartments-calendar-data-translator";
import {
  calendarDates,
  reformedApartmentCalendar,
} from "../types/apiData/apartment/reformed-apartment-calendar";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetApartmentCalendar({
  id,
  start_date,
  end_date,
  building_id,
  limit = 100,
}: {
  id?: string;
  start_date?: string;
  end_date?: string;
  building_id?: string;
  limit?: number;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<reformedApartmentCalendar[]>([]);
  const [extra, setExtra] = useState<{
    booked: calendarDates[];
    blocked: calendarDates[];
  }>({ booked: [], blocked: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getApartmentCalendar = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsFailed(false);
      const { queryString, remakeRequest } = ApiQueryParamsExtractor({
        dataset: {
          start_date: start_date,
          end_date: end_date,
          limit,
        },
      });
      const response = await axios.get(
        `/admin/calendar/${id ? id : "unavailable"}?${queryString}`
      );
      const result = response?.data?.data;
      if (id) {
        const apartment = [
          {
            shortlet_id: Number(id),
            shortlet_name: "",
            booked_dates: result?.booked_dates,
            blocked_dates: result?.blocked_dates,
          },
        ];
        const { reformed } = ApartmentsCalendarDataTranslator({
          dataset: apartment,
        });
        setData(reformed || []);
        const allBookedDates = reformed?.map((item) => item?.booked).flat();
        const allBlockedDates = reformed?.map((item) => item?.blocked).flat();
        setExtra({ booked: allBookedDates, blocked: allBlockedDates });
      } else {
        const result = response?.data?.data;
        const { reformed } = ApartmentsCalendarDataTranslator({
          dataset: result,
        });
        const allBookedDates = reformed?.map((item) => item?.booked).flat();
        const allBlockedDates = reformed?.map((item) => item?.blocked).flat();
        setExtra({ booked: allBookedDates, blocked: allBlockedDates });
        setData(reformed || []);
      }
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id, start_date, end_date, ApartmentsCalendarDataTranslator]);

  useEffect(() => {
    getApartmentCalendar();
  }, [id, start_date, end_date, ApartmentsCalendarDataTranslator]);

  return {
    data,
    extra,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getApartmentCalendar,
  };
}
