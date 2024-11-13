import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  updatePackageAndOfferList,
  addToPaginationHistory,
} from "../stores/apiData/packages-and-offers";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllPackagesAndOffers({
  page = 1,
  search = "",
}: {
  page?: number;
  search?: string;
}) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.allPackagesAndOffers.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  }>({} as any);

  const getPackageAndOffersLists = useCallback(async () => {
    setIsLoading(true);
    try {
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && !search) {
        setPagination(foundPage?.pagination_data);
        dispatch(updatePackageAndOfferList({ data: foundPage?.data }));
      } else {
        const response = await axios.get(
          `/admin/offer?limit=20&search=${search || ""}&page=${page}`
        );
        const { offer } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          offer;
        const paginationDataset = {
          current_page,
          last_page,
          per_page,
          total,
          from,
          to,
          length: data?.length,
        };
        dispatch(updatePackageAndOfferList({ data }));

        dispatch(
          addToPaginationHistory({
            pagination_data: paginationDataset,
            data,
          })
        );
        setPagination(paginationDataset);
      }
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    getPackageAndOffersLists();
  }, [page, search]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getPackageAndOffersLists,
    pagination,
  };
}
