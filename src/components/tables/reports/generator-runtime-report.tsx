import { useCallback, useState } from "react";
import Pagination from "../../pagination";
import NoResult from "../../noResult";
import TableSearch from "../../inputs/search/table-search";
import Status from "../../status";
import ExportSelect from "../../inputs/select/exportSelect";
import Filter from "../../filterAndSort/filter";
import Sort from "../../filterAndSort/sort";
import PenIcon from "../../../assets/icons/pen";
import BinIcon from "../../../assets/icons/bin-icon";
import useGetALlGeneratorRuntimeReports from "../../../services-hooks/reports/useGetAllGeneratorRuntimeReports";

export default function GeneratorRuntimeReportListTable() {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetALlGeneratorRuntimeReports({
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
        <div className=" flex items-center gap-2 flex-col md:flex-row">
          <Filter actionHandler={handleCustomersFiltering} />
          <Sort setSort={setSort} id="sort-by" label="Sort by" />
        </div>

</div>
    <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
      <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
       <div className=" flex items-center gap-4">
        <h2 className="text-xl font-semibold">Generator run-time</h2>
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
                  "Apartment",
                  "Date",
                  "Time-On",
                  "Time-off",
                  "Run-time (HR:Min)",
                  "Action",
                ].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {[].map((request: any) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td>
                      <span className=" rounded-full p-2 border border-primary">
                        {request?.id}
                      </span>
                    </td>
                    <td>{request?.first_name}</td>
                    <td>{request?.last_name}</td>
                    <td>{request?.phone}</td>
                    <td>{request?.total_bookings}</td>
                    <td>
                      <Status
                        status="identity"
                        booleanVal={request?.identity_verified}
                        falsyMessage="Unverified"
                        truthyMessage="Verified"
                      />
                    </td>
                                            <td>
                                              <div className=" flex items-center gap-4">

                                                <button
                                                  title="edit"
                                                >
                                                  <PenIcon />
                                                </button>
                                                <button
                                                  title="delete"
                                                >
                                                  <BinIcon className=" size-6 text-red-500" />
                                                </button>
                                              </div>
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
        label="generator runtime"
      />
    </div>
    </div>
  );
}
