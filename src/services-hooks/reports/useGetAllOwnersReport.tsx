import { useCallback, useEffect, useState } from "react";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { pagination } from "../../types/pagination";
import {
  addToPaginationHistory,
  updateOwnersReportReport,
} from "../../stores/apiData/reports/owners-report";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllOwnersReport({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
  search = "",
  building_id,
  apartment_id,
  category_id,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  building_id?: string;
  apartment_id?: string;
  category_id?: string;
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
          apartment_id,
          category_id,
        },
      });
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && !remakeRequest) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateOwnersReportReport({ data: foundPage?.data }));
      } else {
        const response = await axios.get(`/admin/owner-report/?${queryString}`);
        const { owner_reports } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          owner_reports;
        console.log({ data });
        // const paginationDataset = {
        //   current_page,
        //   last_page,
        //   per_page,
        //   total,
        //   from,
        //   to,
        //   length: data?.length,
        // };
        // const dataset = [
        //   {
        //     id: 1,
        //     building_id: 1,
        //     building: {
        //       id: 1,
        //       name: "Lekki",
        //       is_deleted: 0,
        //       deleted_at: "",
        //       deleted_by: "",
        //       created_at: "",
        //       updated_at: "",
        //     },
        //     shortlet_id: 1,
        //     shortlet: {
        //       id: 1,
        //       name: "Top Apartment",
        //       slug: "",
        //       description: "",
        //       location: "",
        //       currency: "",
        //       price: 500,
        //       caution_fee: 200,
        //       tax_fee: 10,
        //       no_of_bedrooms: 2,
        //       no_of_bathrooms: 2,
        //       min_guests: "",
        //       max_guests: 2,
        //       point_of_interest: "",
        //       cancellation_policy: "",
        //       availability_status: "",
        //       created_at: "",
        //       updated_at: "",
        //       room_option_id: 2,
        //       bookings_count: 2,
        //       last_booking_date: "",
        //       no_of_bookings: 2,
        //     },
        //     expense_id: 1,
        //     expense: {
        //       id: 1,
        //       name: "Lekki",
        //       slug: "",
        //       deleted_at: "",
        //       deleted_by: "",
        //       created_at: "",
        //       updated_at: "",
        //     },
        //     amount: 200,
        //     date: "",
        //     additional_note: "",
        //     monthly_amount: {
        //       jan: 1,
        //       feb: 1,
        //       mar: 1,
        //       apr: 1,
        //       may: 1,
        //       jun: 1,
        //       jul: 1,
        //       aug: 1,
        //       sep: 1,
        //       oct: 1,
        //       nov: 1,
        //       dec: 1,
        //     },
        //   },
        // ];
        // const summaries = {
        //   monthly_totals: {
        //     jan: 1,
        //     feb: 1,
        //     mar: 1,
        //     apr: 1,
        //     may: 1,
        //     jun: 1,
        //     jul: 1,
        //     aug: 1,
        //     sep: 1,
        //     oct: 1,
        //     nov: 1,
        //     dec: 1,
        //   },
        //   monthly_revenue: {
        //     jan: 1,
        //     feb: 1,
        //     mar: 1,
        //     apr: 1,
        //     may: 1,
        //     jun: 1,
        //     jul: 1,
        //     aug: 1,
        //     sep: 1,
        //     oct: 1,
        //     nov: 1,
        //     dec: 1,
        //   },
        //   monthly_management_fee: {
        //     jan: 1,
        //     feb: 1,
        //     mar: 1,
        //     apr: 1,
        //     may: 1,
        //     jun: 1,
        //     jul: 1,
        //     aug: 1,
        //     sep: 1,
        //     oct: 1,
        //     nov: 1,
        //     dec: 1,
        //   },
        //   monthly_profit: {
        //     jan: 1,
        //     feb: 1,
        //     mar: 1,
        //     apr: 1,
        //     may: 1,
        //     jun: 1,
        //     jul: 1,
        //     aug: 1,
        //     sep: 1,
        //     oct: 1,
        //     nov: 1,
        //     dec: 1,
        //   },
        // };
        // dispatch(
        //   updateOwnersReportReport({
        //     data: { data: dataset, summary: summaries },
        //   })
        // );
        // if (!remakeRequest) {
        //   dispatch(
        //     addToPaginationHistory({
        //       pagination_data: paginationDataset,
        //       data: data,
        //     })
        //   );
        // }
        // setPagination(paginationDataset);
      }
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
    category_id,
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
    apartment_id,
    category_id,
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
