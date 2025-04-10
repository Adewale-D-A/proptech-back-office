import { useState } from "react";
import Pagination from "../../pagination";
import NoResult from "../../noResult";
import TableSearch from "../../inputs/search/table-search";
import Status from "../../status";
import useGetAllBookingsLists from "../../../services-hooks/useGetAllBookingsLists";
import { BookingFilterPayload } from "../../../types/apiData/bookings/booking-filter-options";
import formatDate from "../../../utils/isoDateConverter";
import { Link } from "react-router-dom";
import BookingsFilterSearch from "../../filterAndSort/bookings-filter";
import ExportToCSV from "../../export-to-csv";
import { bookingsExportFormater } from "../../../utils/export-formerter-functions";

export default function BookingsReportListTable() {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [filter, setFilter] = useState<BookingFilterPayload>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllBookingsLists({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
      ...filter,
    });
  return (
    <div className=" w-full flex flex-col gap-3">
      <div className="w-full flex justify-between gap-4 flex-col md:flex-row">
        <div className=" max-w-md">
          <TableSearch setValue={setSearch} placeholder="Search..." />
        </div>
        <BookingsFilterSearch setData={setFilter} />
      </div>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <div className=" flex items-center gap-4">
            <h2 className="text-xl font-semibold">Bookings</h2>
            <span className=" text-primary p-1 px-2 bg-primary/10 rounded-xl text-xs font-semibold">
              {pagination?.total} total
            </span>
          </div>
          <div>
            <ExportToCSV
              dataset={data}
              jsonToCSVReformerter={bookingsExportFormater}
              fileName="bookings-report-list"
            />
          </div>
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {[
                    "Customer name",
                    "Apartment",
                    "Amount",
                    "Check-in",
                    "Check-out",
                    "Status",
                    "Action",
                  ].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td>
                        {item?.user?.first_name} {item?.user?.last_name}
                      </td>
                      <td>{item?.shortlet?.name}</td>
                      <td>
                        {item?.currency} {item?.total_price}
                      </td>
                      <td>
                        {formatDate(item?.check_in_date)} {item?.check_in_time}
                      </td>
                      <td>
                        {formatDate(item?.check_out_date)}{" "}
                        {item?.check_out_time}
                      </td>
                      <td>
                        <Status status={item?.status} />
                      </td>
                      <td>
                        <Link
                          to={`/bookings/booking-details/${item?.id}`}
                          className=" px-4 py-2 border font-semibold"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <NoResult />
        )}
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="expenses"
        />
      </div>
    </div>
  );
}
