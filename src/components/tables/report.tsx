import { useState } from "react";
import Pagination from "../pagination";
import NoResult from "../noResult";
import useGetAllReportsLists from "../../services-hooks/useGetReportList";
import { revenueReportList } from "../../types/apiData/reports";
import BarChart from "../charts/bar-chart";
import CalendarIcon from "../../assets/icons/calendar";
import UserPlusIcon from "../../assets/icons/user-plus";
import UsersIcon from "../../assets/icons/users";
import DashboardCard from "../cards/dashboard-cards";

export default function ReportListTable({
  type,
  view,
}: {
  type: "revenue" | "occupancy-ranking" | string;
  view: "sheet" | "chart" | "chart-sheet" | string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllReportsLists({ page: currentPage, type });

  return (
    <div
      className={
        view === "chart-sheet" && type === "occupancy-ranking"
          ? " w-full grid grid-cols-1 md:grid-cols-2 gap-5"
          : " w-full flex gap-5 flex-col md:flex-row"
      }
    >
      {!(type === "occupancy-ranking" && view === "chart") && (
        <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-x-auto">
          {data && data.length > 0 ? (
            <table className=" w-full text-xs">
              <thead className="">
                <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                  {[
                    "Date",
                    "Rooms Sold",
                    "Nights Books",
                    "Total Bookings",
                    "%Occupancy",
                    "IBE Revenue",
                    "OTA Revenue",
                    "ADR",
                    "REVPAR",
                    "Taxes/Fees",
                  ].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {data.map((request: revenueReportList) => {
                  return (
                    <tr key={request?.id} className=" border-b">
                      <td>{request?.date}</td>
                      <td>{request?.roomSold}</td>
                      <td>{request?.nightBook}</td>
                      <td>{request?.totalBooking}</td>
                      <td>{request?.occupancy}</td>
                      <td>{request?.ibeRevenue}</td>
                      <td>{request?.otaRevenue}</td>
                      <td>{request?.refunds}</td>
                      <td>{request?.adr}</td>
                      <td>{request?.revipar}</td>
                      <td>{request?.taxes}</td>
                    </tr>
                  );
                })}
                <tr className=" border-b font-semibold">
                  <td>Total</td>
                  <td>6127</td>
                  <td>6127</td>
                  <td>6048</td>
                  <td></td>
                  <td>N500,117,189.72</td>
                  <td>0</td>
                  <td></td>
                  <td></td>
                  <td>N90117,189.72</td>
                </tr>
              </tbody>
            </table>
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
      )}
      {((type === "occupancy-ranking" && view === "chart") ||
        (type === "occupancy-ranking" && view === "chart-sheet")) && (
        <div className="w-full flex flex-col gap-10">
          <div className=" flex flex-col gap-5">
            <h4 className=" font-semibold text-xl">Totals</h4>
            <div
              className={
                view === "chart-sheet"
                  ? "w-full grid grid-cols-2 gap-3"
                  : "w-full grid grid-cols-2 md:grid-cols-3 gap-5"
              }
            >
              {[
                {
                  id: 1,
                  icon: <CalendarIcon className="w-5 h-5" />,
                  label: "Total Revenue Rate",
                  value: "N100,585, 309.78",
                  theme: "text-[#26397B] bg-[#26397B]/20",
                },
                {
                  id: 2,
                  icon: <UserPlusIcon className="w-5 h-5" />,
                  label: "Total Bookings",
                  value: "6200",
                  theme: "text-[#017EFF] bg-[#017EFF]/20",
                },
                {
                  id: 3,
                  icon: <UsersIcon className="w-5 h-5" />,
                  label: "Total Nights Booked",
                  value: "6300",
                  theme: "text-[#017EFF] bg-[#017EFF]/20",
                },
              ].map((item) => (
                <DashboardCard
                  key={item?.id}
                  theme={item.theme}
                  icon={item?.icon}
                  label={item?.label}
                  value={item?.value}
                />
              ))}
            </div>
          </div>
          <div className=" flex flex-col gap-5">
            <h4 className=" font-semibold text-xl">Occupancy Ranking</h4>
            <div className=" border p-5 rounded-md h-full w-full flex justify-center">
              <BarChart
                data={{
                  labels: [
                    "MONDAY, 17 SEPT",
                    "TUESDAY, 18 SEPT",
                    "WEDNESDAY, 19 SEPT",
                    "THURSDAY, 20 SEPT",
                    "FRIDAY, 21 SEPT",
                    "SATURDAY, 22 SEPT",
                    "SUNDAY, 23 SEPT",
                  ],
                  datasets: [
                    {
                      label: "Occupancy Ranking",
                      data: [3, 3, 2, 5, 6, 8, 12],
                      backgroundColor: "#2E4393",
                      indexAxis: "x",
                      borderRadius: 50,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
