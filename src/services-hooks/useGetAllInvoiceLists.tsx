import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import tempAptData from "../assets/temp-api-mockup-data/invoices.json";
import {
  addToPaginationHistory,
  updateInvoiceList,
} from "../stores/apiData/invoice-lists";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllInvoiceLists({ page = 1 }: { page?: number }) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.allInvoiceLists.value);
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
  const getAllInvoice = useCallback(async () => {
    setIsLoading(true);
    try {
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateInvoiceList({ data: foundPage?.data }));
      } else {
        // const response = await axios.post(`/institution-list?page=${page}`);
        // const responseData = response?.data?.data;
        // const institutions = response?.data?.institution;
        dispatch(updateInvoiceList({ data: tempAptData.data }));

        // TODO: UPDATE based on backend pagination response
        //CURRENTLY: Pagination is not being returned for this dataset,
        //TEMPORARY SOLUTION: Hardcoding pagination
        // const { data, current_page, last_page, per_page, total, from, to } =
        //   responseData;
        // const paginationDataset = {
        //   current_page: 1,
        //   last_page: 1,
        //   per_page: 20,
        //   total: 4,
        //   from: 1,
        //   to: 1,
        // };
        // dispatch(update_institution({data}));
        dispatch(
          addToPaginationHistory({
            pagination_data: tempAptData.pagination,
            data: tempAptData.data,
          })
        );
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
    getAllInvoice();
  }, [page]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllInvoice,
    pagination,
  };
}
