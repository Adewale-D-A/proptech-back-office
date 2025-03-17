import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  addToPaginationHistory,
  updateRatingsAndReviewsList,
} from "../stores/apiData/rating-and-reviews";
import useAxios from "../useHooks/useAxios";
import { pagination } from "../types/pagination";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";
import sampleRtaingReviewsData from "../assets/temp-api-mockup-data/ratings-and-reviews.json";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetRatingsAndReviews({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
  search = "",
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.ratingsAndReviews.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getAllRatingsAndReviews = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { queryString, remakeRequest } = ApiQueryParamsExtractor({
        dataset: {
          page: search ? 1 : page,
          start_date: start_date,
          end_date: end_date,
          sort: sort,
          search: search,
        },
      });
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && !remakeRequest) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateRatingsAndReviewsList({ data: foundPage?.data }));
      } else {
        // const response = await axios.get(`/admin/booking?${queryString}`);
        // const { users } = response?.data?.data;
        // const { data, current_page, last_page, per_page, total, from, to } =
        //   users;
        const data = sampleRtaingReviewsData?.data;
        const paginationDataset = sampleRtaingReviewsData?.pagination;
        dispatch(updateRatingsAndReviewsList({ data }));
        if (!remakeRequest) {
          dispatch(
            addToPaginationHistory({
              pagination_data: paginationDataset,
              data: data,
            })
          );
        }
        setPagination(paginationDataset);
      }
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, start_date, end_date, sort, search]);

  useEffect(() => {
    getAllRatingsAndReviews();
  }, [page, start_date, end_date, sort, search]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllRatingsAndReviews,
    pagination,
  };
}
