import { useCallback, useState } from "react";
import Pagination from "../../pagination";
import NoResult from "../../noResult";
import TableSearch from "../../inputs/search/table-search";
import Status from "../../status";
import ExportSelect from "../../inputs/select/exportSelect";
import FilterSearch from "../../filterAndSort/filter-search";
import useGetAllBookingReports from "../../../services-hooks/reports/useGetAllBookinReport";

export default function BookingsReportListTable() {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllBookingReports({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
    });
  const handleCustomersFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  return (
    <div className=" w-full flex flex-col gap-3">
<div className="w-full flex justify-between gap-4 flex-col md:flex-row">
        <div className=" max-w-md">
          <TableSearch
            setValue={setSearch}
            placeholder="Search..."
          />
        </div>
                  <FilterSearch />

</div>
    <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
      <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
       <div className=" flex items-center gap-4">
        <h2 className="text-xl font-semibold">Bookings</h2>
<span className=" text-primary p-1 px-2 bg-primary/10 rounded-xl text-xs font-semibold">5 total</span>
       </div>
        <div>
          
                  <ExportSelect id="report" />
        </div>
      </div>
      <div className="block px-5">
        {data && data.length > 0 ? (
          <table className=" w-full text-xs  overflow-x-auto">
            <thead className="">
              <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
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
            <tbody className="">
              {data.map((request) => {
                return (
                  <tr key={request?.id} className=" border-b">

                    <td>{request?.customer_name}</td>
                    <td>{request?.shortlet_name}</td>
                    <td>{request?.amount}</td>
                    <td>{request?.check_in_date}</td>
                    <td>{request?.check_out_date}</td>
                    <td>
                      <Status status={request?.status}
                      />
                    </td>
                    <td className="">
                      <span className=" px-4 py-2 border font-semibold">View</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NoResult />
        )}
      </div>
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
