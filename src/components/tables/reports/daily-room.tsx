import { useCallback, useState } from "react";
import Filter from "../../filterAndSort/filter";
import Select from "../../inputs/select";
import LoadingButton from "../../button";
import { dailyRoomReportList } from "../../../types/apiData/reports";
import formatDate from "../../../utils/isoDateConverter";
import useGetRevenueReport from "../../../services-hooks/reports/revenue";
import ExportToCSV from "../../export-to-csv";
import { revenueReportExportFormater } from "../../../utils/export-formerter-functions";
import ApartmentThroughBuildingSelector from "../../inputs/select/apartment-through-building-selector";
import TableTemplate from "../table-template";
import useExtractUrlParams from "../../../useHooks/extract-url-query-params";
import useGetDailyRoomReport from "../../../services-hooks/reports/useGetDailyRoomReport";

export default function DailyRoomReportTable() {
  const [type, setType] = useState("");

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
  const { data, isLoading, retryFunction, pagination } = useGetDailyRoomReport({
    page,
    apartmentId: buildingId && apartmentId ? String(apartmentId) : "",
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    group: "day",
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
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-center justify-between flex-col md:flex-row gap-4 p-4 rounded-md border flex-wrap lg:flex-nowrap">
        <div>
          <Filter actionHandler={handleCustomersFiltering} />
        </div>
        <div className=" flex min-w-max items-center gap-2">
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
        </div>{" "}
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
            fileName="daily-room-report-list"
          />
        </div>
      </div>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 overflow-auto ">
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Type",
              key: "date",
              showColumnSort: false,
              render: (row: dailyRoomReportList) => <span>{row?.type}</span>,
            },
            {
              header: "Room",
              key: "rooms_sold",
              showColumnSort: false,
              render: (row: dailyRoomReportList) => (
                <span>{row?.shortlet_name}</span>
              ),
            },
            {
              header: "Customer Name",
              key: "customer_name",
              showColumnSort: false,
              render: (row: dailyRoomReportList) => (
                <span>{row?.occupant_name}</span>
              ),
            },
            {
              header: "Guests",
              key: "guests",
              showColumnSort: false,
              render: (row: dailyRoomReportList) => (
                <span>{row?.number_of_guests}</span>
              ),
            },
            // {
            //   header: "Rate Plan",
            //   key: "rate_plan",
            //   showColumnSort: false,
            //   render: (row: dailyRoomReportList) => (
            //     <span>{row?.occupancy_rate}</span>
            //   ),
            // },
            // {
            //   header: "Meal Plan",
            //   key: "meal_plan",
            //   showColumnSort: false,
            //   render: (row: dailyRoomReportList) => (
            //     <span>{row?.occupant_name}</span>
            //   ),
            // },
            {
              header: "Channel",
              key: "channel",
              showColumnSort: false,
              render: (row: dailyRoomReportList) => <span>{row?.channel}</span>,
            },
            {
              header: "Check In",
              key: "check_in",
              showColumnSort: false,
              render: (row: dailyRoomReportList) => (
                <span>{formatDate(row?.check_in_date)}</span>
              ),
            },
            {
              header: "Check Out",
              key: "check_out",
              showColumnSort: false,
              render: (row: dailyRoomReportList) => (
                <span>{formatDate(row?.check_out_date)}</span>
              ),
            },
            {
              header: "Nights",
              key: "nights",
              showColumnSort: false,
              render: (row: dailyRoomReportList) => (
                <span>{row?.number_of_days}</span>
              ),
            },
            {
              header: "Notes",
              key: "notes",
              showColumnSort: false,
              render: (row: dailyRoomReportList) => <span>{row?.notes}</span>,
            },
          ]}
          showPaginator={true}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
