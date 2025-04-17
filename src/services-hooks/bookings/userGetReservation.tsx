import useGetUpcomingReservation from "./useGetUpcomingReservations";
import useGetArrivingReservation from "./useGetArrivingReservations";
import useGetDepartingReservation from "./useGetDepartingReservation";
import useGetLatestReservation from "./useGetLatestReservation";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetReservation({
  page = 1,
  start_date,
  end_date,
  sort = "asc",
  search = "",
  type,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  type: "upcoming" | "latest" | "arriving" | "departing";
}) {
  const {
    data: upcoming_data,
    pagination: upcoming_pagination,
    isLoading: upcoming_loading,
    isFailed: upcoming_is_failed,
    setIsFailed: upcoming_set_is_failed,
    retryFunction: upcoming_retry,
  } = useGetUpcomingReservation({
    page: type === "upcoming" ? page : 1,
    start_date: type === "upcoming" ? start_date : undefined,
    end_date: type === "upcoming" ? end_date : undefined,
    sort: type === "upcoming" ? sort : undefined,
  });
  const {
    data: arriving_data,
    pagination: arriving_pagination,
    isLoading: arriving_loading,
    isFailed: arriving_is_failed,
    setIsFailed: arriving_set_is_failed,
    retryFunction: arriving_retry,
  } = useGetArrivingReservation({
    page: type === "arriving" ? page : 1,
    start_date: type === "arriving" ? start_date : undefined,
    end_date: type === "arriving" ? end_date : undefined,
    sort: type === "arriving" ? sort : undefined,
  });
  const {
    data: departing_data,
    pagination: departing_pagination,
    isLoading: departing_loading,
    isFailed: departing_is_failed,
    setIsFailed: departing_set_is_failed,
    retryFunction: departing_retry,
  } = useGetDepartingReservation({
    page: type === "departing" ? page : 1,
    start_date: type === "departing" ? start_date : undefined,
    end_date: type === "departing" ? end_date : undefined,
    sort: type === "departing" ? sort : undefined,
  });
  const {
    data: latest_data,
    pagination: latest_pagination,
    isLoading: latest_loading,
    isFailed: latest_is_failed,
    setIsFailed: latest_set_is_failed,
    retryFunction: latest_retry,
  } = useGetLatestReservation({
    page: type === "latest" ? page : 1,
    start_date: type === "latest" ? start_date : undefined,
    end_date: type === "latest" ? end_date : undefined,
    sort: type === "latest" ? sort : undefined,
  });

  if (type === "arriving") {
    return {
      data: arriving_data,
      isLoading: arriving_loading,
      isFailed: arriving_is_failed,
      setIsFailed: arriving_set_is_failed,
      retryFunction: arriving_retry,
      pagination: arriving_pagination,
    };
  } else if (type === "departing") {
    return {
      data: departing_data,
      isLoading: departing_loading,
      isFailed: departing_is_failed,
      setIsFailed: departing_set_is_failed,
      retryFunction: departing_retry,
      pagination: departing_pagination,
    };
  } else if (type === "latest") {
    return {
      data: latest_data,
      isLoading: latest_loading,
      isFailed: latest_is_failed,
      setIsFailed: latest_set_is_failed,
      retryFunction: latest_retry,
      pagination: latest_pagination,
    };
  } else {
    return {
      data: upcoming_data,
      isLoading: upcoming_loading,
      isFailed: upcoming_is_failed,
      setIsFailed: upcoming_set_is_failed,
      retryFunction: upcoming_retry,
      pagination: upcoming_pagination,
    };
  }
}
