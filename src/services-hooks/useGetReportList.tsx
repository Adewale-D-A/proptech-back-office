import { useCallback, useEffect, useState } from "react";
import tempAptData from "../assets/temp-api-mockup-data/revenueList.json";
import dailyReporttempAptData from "../assets/temp-api-mockup-data/dailyRoomReportList.json";
import occupancyTimetempAptData from "../assets/temp-api-mockup-data/occupancyTimeList.json";

import {
  dailyRoomReportList,
  occupancyTimeReportList,
  revenueReportList,
} from "../types/apiData/reports";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllReportsLists({
  page = 1,
  type,
}: {
  page?: number;
  type:
    | "revenue"
    | "occupancy-ranking"
    | "daily-room"
    | "occupancy-per-time"
    | string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<revenueReportList[]>([]);
  const [dailyRoomReportData, setDailyRoomReportData] = useState<
    dailyRoomReportList[]
  >([]);
  const [occupanyTimeReportData, setOccupancyTimeReportData] = useState<
    occupancyTimeReportList[]
  >([]);

  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  }>({} as any);

  const getAllReports = useCallback(async () => {
    setIsLoading(true);
    try {
      if (type === "daily-room") {
        setDailyRoomReportData(dailyReporttempAptData?.data);
        setPagination(dailyReporttempAptData.pagination);
      } else if (type === "occupancy-per-time") {
        setOccupancyTimeReportData(occupancyTimetempAptData?.data);
        setPagination(occupancyTimetempAptData.pagination);
      } else {
        setData(tempAptData?.data);
        setPagination(tempAptData.pagination);
      }
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getAllReports();
  }, [page]);

  return {
    data: (type === "daily-room"
      ? dailyRoomReportData
      : type === "occupancy-per-time"
      ? occupanyTimeReportData
      : data) as any,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllReports,
    pagination,
  };
}
