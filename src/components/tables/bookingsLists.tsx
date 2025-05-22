import { ReactNode, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import Status from "../status";
import Filter from "../filterAndSort/filter";
import formatDate from "../../utils/isoDateConverter";
import useGetReservation from "../../services-hooks/bookings/userGetReservation";
import NoResult from "../noResult";

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
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, pagination, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetReservation({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort,
      type,
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
      {data && data.length > 0 ? (
        <div className=" w-full overflow-x-auto">
          <table className=" w-full">
            <thead className="">
              <tr>
                {["ID", "Customer Name", "Rooms", "Check-in", "Status"].map(
                  (head) => (
                    <th key={head}>{head}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="">
              {data.map((request) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td>
                      <Link
                        to={`/bookings/booking-details/edit-reservation/${request?.id}`}
                        className=" rounded-full p-2 border border-primary"
                      >
                        {request?.id}
                      </Link>
                    </td>
                    <td>
                      {request?.user?.first_name} {request?.user?.last_name}
                    </td>
                    <td>{request?.shortlet?.name}</td>
                    <td>{formatDate(request?.check_in_date)}</td>
                    {variant === "action" ? (
                      <td>
                        <Link
                          to={`/bookings/booking-details/edit-reservation/${request?.id}`}
                          className=" text-primary"
                        >
                          View Details
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <Status status={request?.status} />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <NoResult />
      )}
      {/* <div className="w-full block md:hidden">
        <MobileReservationsTable data={data} variant={variant} />
      </div> */}
      <Pagination
        pagination={pagination}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        label="Reservations"
      />
    </div>
  );
}
