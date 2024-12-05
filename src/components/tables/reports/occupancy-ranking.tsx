import { useState } from "react";
import Filter from "../../filterAndSort/filter";
import { apartmentById } from "../../../types/apiData/apartment";
import Select from "../../inputs/select";
import Search from "../../inputs/search";
import LoadingButton from "../../button";
import ExportSelect from "../../inputs/select/exportSelect";
import useGetAllReportsLists from "../../../services-hooks/useGetReportList";
import { revenueReportList } from "../../../types/apiData/reports";
import NoResult from "../../noResult";
import Pagination from "../../pagination";
import CalendarIcon from "../../../assets/icons/calendar";
import UserPlusIcon from "../../../assets/icons/user-plus";
import UsersIcon from "../../../assets/icons/users";
import DashboardCard from "../../cards/dashboard-cards";
import BarChart from "../../charts/bar-chart";
import ChartIcon from "../../../assets/icons/chart";

export default function OccupancyRankingReportTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [group, setGroup] = useState("");
  const [viewType, setViewType] = useState("sheet");

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllReportsLists({ page: currentPage, type: "occupancy-ranking" });

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-center justify-between flex-col md:flex-row gap-4 p-4 rounded-md border flex-wrap lg:flex-nowrap">
        <div>
          <Filter />
        </div>
        <div className=" flex items-center gap-2">
          <div>
            <Select
              isRequired={true}
              value={group}
              setValue={setGroup}
              id="group-by"
            >
              <option value="">Group by</option>
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </Select>
          </div>
        </div>
        <Search
          id="apartment-search"
          componentId="apartment"
          placeholder="Apartment name..."
          setValue={setApartment}
        />
        <div className=" flex items-center gap-4">
          <LoadingButton
            label="Load data"
            variant={2}
            isLoading={false}
            type="button"
          />
          <ExportSelect id="report" />
        </div>
      </div>
      <div className=" flex justify-end ">
        <div className="flex items-center gap-3">
          <ChartIcon />
          <Select
            isRequired={true}
            value={viewType}
            setValue={setViewType}
            id="view-type"
          >
            <option value="sheet">Sheet</option>
            <option value="chart">Chart</option>
            <option value="chart-sheet">Sheet + Chart</option>
          </Select>
        </div>
      </div>
      <div
        className={
          viewType === "chart-sheet"
            ? " w-full grid grid-cols-1 md:grid-cols-2 gap-5"
            : " w-full flex gap-5 flex-col md:flex-row"
        }
      >
        {" "}
        {!(viewType === "chart") && (
          <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-auto ">
            {data && data.length > 0 ? (
              <table className=" w-full text-xs overflow-x-auto">
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
              pagination={pagination}
              setCurrentPage={setCurrentPage}
              isLoading={isLoading}
              label="Entries"
            />
          </div>
        )}
        {(viewType === "chart" || viewType === "chart-sheet") && (
          <div className="w-full flex flex-col gap-10">
            <div className=" flex flex-col gap-5">
              <h4 className=" font-semibold text-xl">Totals</h4>
              <div
                className={
                  viewType === "chart-sheet"
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
    </div>
  );
}
