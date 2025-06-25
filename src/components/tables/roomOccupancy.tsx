import { useState } from "react";
import useGetDailyOccupancy from "../../services-hooks/bookings/useGetTodayOccupancy";
import formatDate from "../../utils/isoDateConverter";
import paginatedPageSerializer from "../../utils/page-serializer";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { reservations } from "../../types/apiData/bookings/reservation";

export default function RoomOccupancyListTable({}: {}) {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
  });
  const { data, pagination, isLoading } = useGetDailyOccupancy({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    limit: size,
  });

  return (
    <div className="w-full flex flex-col gap-5 md:p-5">
      <TableTemplate
        data={data}
        isLoading={isLoading}
        columns={[
          {
            header: "S/N",
            key: "sn",
            showColumnSort: false,
            render: (row: reservations, index) => (
              <span>
                {" "}
                {paginatedPageSerializer({
                  currentPage: pagination?.current_page,
                  pageSize: pagination?.per_page,
                  index: index || 0,
                })}
              </span>
            ),
          },
          {
            header: "Apartment Name",
            key: "apartment_name",
            showColumnSort: false,
            render: (row: reservations) => <span>{row?.shortlet?.name}</span>,
          },
          {
            header: "Customer Name",
            key: "customer_name",
            showColumnSort: false,
            render: (row: reservations) => (
              <span>
                {" "}
                {row?.user?.first_name} {row?.user?.last_name}
              </span>
            ),
          },
          {
            header: "Amount Paid",
            key: "amount_paid",
            showColumnSort: false,
            render: (row: reservations) => (
              <span>
                {row?.currency} {row?.total_price}
              </span>
            ),
          },

          {
            header: "Check-in Date",
            key: "check_in_date",
            showColumnSort: false,
            render: (row: reservations) => (
              <span>{formatDate(row?.check_in_date)}</span>
            ),
          },
          {
            header: "Check-out Date",
            key: "check_out_date",
            showColumnSort: false,
            render: (row: reservations) => (
              <span>{formatDate(row?.check_out_date)}</span>
            ),
          },
        ]}
        showPaginator={true}
        pagination={pagination}
      />
    </div>
  );
}
