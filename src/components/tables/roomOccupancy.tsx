import { useState } from "react";
import Pagination from "../pagination";
import useGetDailyOccupancy from "../../services-hooks/bookings/useGetTodayOccupancy";
import formatDate from "../../utils/isoDateConverter";
import MobileOccupancyTable from "./mobile/occupancy";
import NoResult from "../noResult";
import paginatedPageSerializer from "../../utils/page-serializer";

export default function RoomOccupancyListTable({}: {}) {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, pagination, isLoading, isFailed, setIsFailed, retryFunction } =
    useGetDailyOccupancy({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
    });

  return (
    <div className="w-full flex flex-col gap-5 md:p-5">
      {data && data.length > 0 ? (
        <div className=" w-full overflow-x-auto">
          <table className=" w-full">
            <thead>
              <tr>
                <th className=" text-nowrap">S/N</th>
                {[
                  "Apartment Name",
                  "Customer Name",
                  "Amount Paid",
                  "Check-in Date",
                  "Check-out Date",
                ].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((request, index) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td>
                      {paginatedPageSerializer({
                        currentPage: pagination?.current_page,
                        pageSize: pagination?.per_page,
                        index,
                      })}
                    </td>
                    <td>{request?.shortlet?.name}</td>
                    <td>
                      {request?.user?.first_name} {request?.user?.last_name}
                    </td>
                    <td>
                      {request?.currency} {request?.total_price}
                    </td>
                    <td>{formatDate(request?.check_in_date)}</td>
                    <td>{formatDate(request?.check_out_date)}</td>
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
        <MobileOccupancyTable data={data} />
      </div> */}
      <Pagination
        pagination={pagination}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        label=""
      />
    </div>
  );
}
