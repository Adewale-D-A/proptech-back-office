import { useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import ClipBoardIcon from "../../assets/icons/clipboard";
import Select from "../../components/inputs/select";
import Filter from "../../components/filterAndSort/filter";
import ApartmentSingleSelect from "../../components/inputs/select/apartmentSelect";
import LoadingButton from "../../components/button";
import ExportSelect from "../../components/inputs/select/exportSelect";
import ReportListTable from "../../components/tables/report";
import TimeRangeSelector from "../../components/inputs/select/timeRange";
import DailyRoomReportListTable from "../../components/tables/dailyRoomReportList";
import OccupanyTimeReportListTable from "../../components/tables/occupancyTimeReportList";
import ChartIcon from "../../assets/icons/chart";

const breadCrumb = [
  {
    url: "#",
    label: "Report",
    icon: <ClipBoardIcon />,
  },
];
export default function Reports() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Reports",
        pageDescription: "Reports",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [reportType, setReportType] = useState("");
  const [apartment, setApartment] = useState("");
  const [group, setGroup] = useState("");
  const [type, setType] = useState("sheet");

  const [viewType, setViewType] = useState("");
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className="flex items-center gap-4 p-4 rounded-md border flex-wrap lg:flex-nowrap">
          <Select
            isRequired={true}
            value={reportType}
            setValue={setReportType}
            id="report-type"
          >
            <option value="">Select Report Type</option>
            <option value="revenue">Revenue</option>
            <option value="occupancy-ranking">Occupancy Ranking</option>
            <option value="daily-room">Daily Room Report</option>
            <option value="occupancy-per-time">Occupany Per Time Report</option>
          </Select>
          <Filter />
          {reportType === "occupancy-ranking" && (
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
          )}
          {reportType === "daily-room" && (
            <Select
              isRequired={true}
              value={type}
              setValue={setType}
              id="daily-room-type"
            >
              <option value="">Select Type</option>
              <option value="stayover">Stayover</option>
              <option value="arriving">Arriving</option>
              <option value="departing">Departing</option>
            </Select>
          )}
          {reportType === "occupancy-per-time" && <TimeRangeSelector />}
          <ApartmentSingleSelect
            id="report-apartment"
            placeholder="Select Apartment"
            value={apartment}
            setValue={setApartment}
          />
          <LoadingButton
            label="Load data"
            variant={2}
            isLoading={false}
            type="button"
          />
          <ExportSelect id="report" />
        </div>
        {reportType === "occupancy-ranking" && (
          <div className=" flex justify-end">
            <div className=" w-fit flex items-center gap-3">
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
        )}
        <div>
          {reportType === "daily-room" ? (
            <DailyRoomReportListTable />
          ) : reportType === "occupancy-per-time" ? (
            <OccupanyTimeReportListTable />
          ) : (
            <ReportListTable type={reportType} view={viewType} />
          )}
        </div>
      </div>
    </section>
  );
}
