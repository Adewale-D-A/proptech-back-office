import { ReactNode, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import Status from "../status";
import Filter from "../filterAndSort/filter";
import formatDate from "../../utils/isoDateConverter";
import useGetReservation from "../../services-hooks/bookings/userGetReservation";

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
      sort: sort,
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
      <div className=" px-3 flex flex-col gap-3 justify-center items-center">
        <table className=" w-full text-xs overflow-x-auto">
          <thead className="">
            <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
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
                    <span className=" rounded-full p-2 border border-primary">
                      {request?.id}
                    </span>
                  </td>
                  <td>
                    {request?.user?.first_name} {request?.user?.last_name}
                  </td>
                  <td>{request?.shortlet?.name}</td>
                  <td>{formatDate(request?.check_in_date)}</td>
                  {variant === "action" ? (
                    <td>
                      <Link to={`#`} className=" text-primary">
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
      <Pagination
        pagination={pagination}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        label="Reservations"
      />
    </div>
  );
}
