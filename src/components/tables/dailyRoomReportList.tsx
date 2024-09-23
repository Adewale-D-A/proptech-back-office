import { useState } from "react";
import Pagination from "../pagination";
import NoResult from "../noResult";
import useGetAllReportsLists from "../../services-hooks/useGetReportList";
import { dailyRoomReportList } from "../../types/apiData/reports";

export default function DailyRoomReportListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllReportsLists({ page: currentPage, type: "daily-room" });

  return (
    <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
      {data && data.length > 0 ? (
        <>
          <table className=" w-full text-xs overflow-x-auto">
            <thead className="">
              <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                {[
                  "Type",
                  "Apartment",
                  "Customer Name",
                  "Guests",
                  "Rate Plan",
                  "Meal Plan",
                  "Channel",
                  "Check In",
                ].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {data.map((request: dailyRoomReportList) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td>{request?.type}</td>
                    <td>{request?.apartment}</td>
                    <td>{request?.customer}</td>
                    <td>{request?.guest}</td>
                    <td>{request?.rate}</td>
                    <td>{request?.meal}</td>
                    <td>{request?.channel}</td>
                    <td>{request?.checkIn}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className=" flex items-center gap-4 font-semibold flex-wrap">
            {[
              {
                id: 1,
                label: "Arriving",
                value: 12,
              },
              {
                id: 2,
                label: "Departing",
                value: 0,
              },
              {
                id: 3,
                label: "Stayover",
                value: 131,
              },
              {
                id: 4,
                label: "Breakfast",
                value: 0,
              },
              {
                id: 5,
                label: "Lunch",
                value: 0,
              },
              {
                id: 6,
                label: "Dinner",
                value: 0,
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
