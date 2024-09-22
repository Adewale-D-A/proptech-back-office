import { useState } from "react";
import Pagination from "../pagination";
import NoResult from "../noResult";
import useGetAllReportsLists from "../../services-hooks/useGetReportList";
import { occupancyTimeReportList } from "../../types/apiData/reports";

export default function OccupanyTimeReportListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllReportsLists({ page: currentPage, type: "occupancy-per-time" });

  return (
    <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
      {data && data.length > 0 ? (
        <>
          <table className=" w-full text-xs  overflow-x-auto">
            <thead className="">
              <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                {[
                  "Date Time",
                  "Apartment",
                  "Status",
                  "Customer Name",
                  "Guests",
                  "Check In",
                  "Check Out",
                ].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {data.map((request: occupancyTimeReportList) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td>{request?.dateTime}</td>
                    <td>{request?.apartment}</td>
                    <td>{request?.status}</td>
                    <td>{request?.customer}</td>
                    <td>{request?.guest}</td>
                    <td>{request?.checkIn}</td>
                    <td>{request?.checkOut}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className=" flex items-center gap-4 font-semibold flex-wrap">
            {[
              {
                id: 1,
                label: "Occupied",
                value: 33,
              },
              {
                id: 2,
                label: "Vacant",
                value: 6,
              },
              {
                id: 3,
                label: "No of Guests",
                value: 131,
              },
              {
                id: 4,
                label: "No of Nights",
                value: 500,
              },
            ].map((item) => (
              <h6 key={item?.id}>
                {item?.label} {item?.value}
              </h6>
            ))}
          </div>
        </>
      ) : (
        <NoResult />
      )}
      <Pagination
        pagination={{
          current_page: 1,
          last_page: 2,
          per_page: 20,
          total: 24,
          from: 1,
          to: 1,
        }}
        setCurrentPage={setCurrentPage}
        isLoading={false}
        label="Entries"
      />
    </div>
  );
}
