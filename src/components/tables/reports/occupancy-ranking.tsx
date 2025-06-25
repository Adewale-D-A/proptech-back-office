import { useCallback, useState } from "react";
import Filter from "../../filterAndSort/filter";
import Select from "../../inputs/select";
import LoadingButton from "../../button";
import { occupancyRankingReportList } from "../../../types/apiData/reports";
import CalendarIcon from "../../../assets/icons/calendar";
import UsersIcon from "../../../assets/icons/users";
import DashboardCard from "../../cards/dashboard-cards";
import BarChart from "../../charts/bar-chart";
import ChartIcon from "../../../assets/icons/chart";
import ExportToCSV from "../../export-to-csv";
import { revenueReportExportFormater } from "../../../utils/export-formerter-functions";
import ApartmentThroughBuildingSelector from "../../inputs/select/apartment-through-building-selector";
import useGetOccupancyRankingReport from "../../../services-hooks/reports/useGetOccupancyRanking";
import useExtractUrlParams from "../../../useHooks/extract-url-query-params";
import TableTemplate from "../table-template";
import currencyFormat from "../../../utils/currency-formatter";

export default function OccupancyRankingReportTable() {
  const [group, setGroup] = useState("");
  const [viewType, setViewType] = useState("sheet");

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [apartmentId, setApartmentId] = useState("");
  const [buildingId, setBuildingId] = useState("");

  const [{ page, size }] = useExtractUrlParams({
    page: 1,
    size: 20,
  });
  const { data, summary, isLoading, retryFunction, pagination } =
    useGetOccupancyRankingReport({
      page,
      apartmentId: buildingId && apartmentId ? String(apartmentId) : "",
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      group: group,
      limit: size,
    });

  const handleLoadData = useCallback(() => {
    retryFunction();
  }, [apartmentId]);

  const handleCustomersFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        {/* filter options */}
        <>
          <div className="flex items-center justify-between flex-col md:flex-row gap-4 p-4 rounded-md border flex-wrap lg:flex-nowrap">
            <div>
              <Filter actionHandler={handleCustomersFiltering} />
            </div>
            <div className=" flex min-w-max items-center gap-2">
              <Select
                isRequired={true}
                value={group}
                setValue={setGroup}
                id="group-by"
              >
                <option value="" disabled>
                  Group by
                </option>
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </Select>
            </div>
            <div className="w-full max-w-screen-md flex items-center flex-col md:flex-row gap-2">
              <ApartmentThroughBuildingSelector
                setApartmentId={setApartmentId}
                apartmentId={apartmentId}
                buildingId={buildingId}
                setBuildingId={setBuildingId}
                withLabel={false}
              />
            </div>
            <div className=" flex items-center gap-4">
              <LoadingButton
                label="Load data"
                variant={2}
                isLoading={false}
                type="button"
                clickHandler={() => handleLoadData()}
              />
              <ExportToCSV
                dataset={data}
                jsonToCSVReformerter={revenueReportExportFormater}
                fileName="occupancy-report-list"
              />
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
        </>
        <div
          className={
            viewType === "chart-sheet"
              ? " w-full grid grid-cols-1 md:grid-cols-2 gap-5"
              : " w-full flex gap-5 flex-col md:flex-row"
          }
        >
          {/* table view ONLY*/}
          {!(viewType === "chart") && (
            <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 overflow-auto ">
              <TableTemplate
                data={data}
                isLoading={isLoading}
                columns={[
                  {
                    header: "Date",
                    key: "date",
                    showColumnSort: false,
                    render: (row: occupancyRankingReportList) => (
                      <span>{row?.date}</span>
                    ),
                  },
                  {
                    header: "Rooms Sold",
                    key: "rooms_sold",
                    showColumnSort: false,
                    render: (row: occupancyRankingReportList) => (
                      <span>{row?.rooms_sold}</span>
                    ),
                  },
                  {
                    header: "Nights Booked",
                    key: "nights_booked",
                    showColumnSort: false,
                    render: (row: occupancyRankingReportList) => (
                      <span>{row?.nights_booked}</span>
                    ),
                  },
                  {
                    header: "Nights Available",
                    key: "nights_available",
                    showColumnSort: false,
                    render: (row: occupancyRankingReportList) => (
                      <span>{row?.nights_available}</span>
                    ),
                  },
                  {
                    header: "Occupancy Rate",
                    key: "occupancy_rate",
                    showColumnSort: false,
                    render: (row: occupancyRankingReportList) => (
                      <span>{row?.occupancy_rate}</span>
                    ),
                  },
                  {
                    header: "Revenue",
                    key: "revenue",
                    showColumnSort: false,
                    render: (row: occupancyRankingReportList) => (
                      <span>{row?.revenue}</span>
                    ),
                  },
                ]}
                showPaginator={true}
                pagination={pagination}
              />{" "}
              {/* <table className=" w-full">
                <thead>
                  <tr className=" opacity-0">
                    {[
                      "Date",
                      "Rooms Sold",
                      "Nights Booked",
                      "Nights Available",
                      "Occupancy Rate",
                      "Revenue",
                    ].map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className=" border-b font-semibold">
                    <td>Total</td>
                    <td></td>
                    <td>{reportSummary?.total_nights_booked}</td>
                    <td>{reportSummary?.total_bookings}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{reportSummary?.total_revenue}</td>
                  </tr>
                </tbody>
              </table> */}
              {/* <Pagination pagination={pagination} isLoading={isLoading} /> */}
            </div>
          )}
          {/* chart ONLY*/}
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
                      label: "Occupancy",
                      value: summary?.[0]?.occupancy_rate,
                      theme: "text-[#26397B] bg-[#26397B]/20",
                    },
                    {
                      id: 3,
                      icon: <UsersIcon className="w-5 h-5" />,
                      label: "Revenue",
                      value: currencyFormat(summary?.[0]?.revenue),
                      theme: "text-[#017EFF] bg-[#017EFF]/20",
                    },
                    // {
                    //   id: 2,
                    //   icon: <UserPlusIcon className="w-5 h-5" />,
                    //   label: "Total Bookings",
                    //   value: 0,
                    //   theme: "text-[#017EFF] bg-[#017EFF]/20",
                    // },
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
                      labels: data.map((item) => item?.date),
                      datasets: [
                        {
                          label: "Occupancy Ranking",
                          data: data.map((item) => item?.occupancy_rate),
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
    </>
  );
}
