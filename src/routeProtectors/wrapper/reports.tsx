import { Outlet, useLocation } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import ClipBoardIcon from "../../assets/icons/clipboard";
import Filter from "../../components/filterAndSort/filter";
import Search from "../../components/inputs/search";
import LoadingButton from "../../components/button";
import ExportSelect from "../../components/inputs/select/exportSelect";
import { apartmentById } from "../../types/apiData/apartment";
import { useState } from "react";
import Select from "../../components/inputs/select";
import TimeRangeSelector from "../../components/inputs/select/timeRange";
import ChartIcon from "../../assets/icons/chart";

const tabList = [
  {
    id: 1,
    icon: <ClipBoardIcon />,
    label: "Revenue Reports",
    url: "/reports/revenue",
  },
  {
    id: 2,
    icon: <ClipBoardIcon />,
    label: "Occupancy Ranking",
    url: "/reports/occupancy-ranking",
  },
  {
    id: 3,
    icon: <ClipBoardIcon />,
    label: "Daily Room",
    url: "/reports/daily-room",
  },
  {
    id: 4,
    icon: <ClipBoardIcon />,
    label: "Occupany Per Time",
    url: "/reports/occupancy-per-time",
  },
];
export default function ReportsTabWrapper() {
  const location = useLocation();
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [group, setGroup] = useState("");
  const [type, setType] = useState("sheet");
  const [viewType, setViewType] = useState("");
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <div className="flex items-center justify-between flex-col md:flex-row gap-4 p-4 rounded-md border flex-wrap lg:flex-nowrap">
        <div>
          <Filter />
        </div>
        {location.pathname === tabList[1]?.url && (
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
        )}
        <div>
          {location.pathname === tabList[2]?.url && (
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
        </div>
        <div>
          {location.pathname === tabList[3]?.url && <TimeRangeSelector />}
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
      <Outlet />
    </section>
  );
}
