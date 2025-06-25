import { ReactNode, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Status from "../status";
import Filter from "../filterAndSort/filter";
import formatDate from "../../utils/isoDateConverter";
import useGetReservation from "../../services-hooks/bookings/userGetReservation";
import TableTemplate from "./table-template";
import { reservations } from "../../types/apiData/bookings/reservation";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";

export default function BookingsListTable({
  variant,
  label,
  type,
  icon,
}: {
  variant: "status" | "action";
  label: string;
  type: "upcoming" | "latest" | "arriving" | "departing";
  icon: ReactNode;
}) {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [{ sort }] = useExtractUrlParams({
    sort: "asc",
  });

  const { data, pagination, isLoading } = useGetReservation({
    page: currentPage,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    type,
    limit,
  });

  const handleSalesFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  return (
    <div className=" w-full flex flex-col gap-4 border rounded-md">
      <div className="flex  flex-col md:flex-row items-center justify-between gap-2 border-b p-3">
        <h4 className="text-lg font-semibold  flex items-center gap-2">
          {icon} <span>{label}</span>{" "}
        </h4>
        <div className=" w-fit">
          <Filter actionHandler={handleSalesFiltering} />
        </div>
      </div>
      <TableTemplate
        data={data}
        isLoading={isLoading}
        columns={[
          {
            header: "ID",
            key: "name",
            showColumnSort: false,
            render: (row: reservations) => (
              <Link
                to={`/bookings/booking-details/edit-reservation/${row?.id}`}
                className=" rounded-full p-2 border border-primary"
              >
                {row?.id}
              </Link>
            ),
          },
          {
            header: "Customer Name",
            key: "name",
            showColumnSort: false,
            render: (row: reservations) => (
              <span>
                {row?.user?.first_name} {row?.user?.last_name}
              </span>
            ),
          },
          {
            header: "Rooms",
            key: "name",
            showColumnSort: false,
            render: (row: reservations) => <span>{row?.shortlet?.name}</span>,
          },
          {
            header: type === "departing" ? "Check-out" : "Check-in",
            key: "name",
            showColumnSort: false,
            render: (row: reservations) => (
              <span>
                {type === "departing"
                  ? formatDate(row?.check_out_date)
                  : formatDate(row?.check_in_date)}
              </span>
            ),
          },
          {
            header: variant === "action" ? "Action" : "Status",
            key: "name",
            showColumnSort: false,
            render:
              variant === "action"
                ? (row: reservations) => (
                    <Link
                      to={`/bookings/booking-details/edit-reservation/${row?.id}`}
                      className=" text-primary"
                    >
                      View Details
                    </Link>
                  )
                : (row: reservations) => <Status status={row?.status} />,
          },
        ]}
        showPaginator={true}
        pagination={pagination}
        onCurrentPageChange={setCurrentPage}
        onPageSizeChange={setLimit}
      />
    </div>
  );
}
