import { useCallback, useState } from "react";
import LoadingButton from "../../button";
import Filter from "../../filterAndSort/filter";
import TimeRangeSelector from "../../inputs/select/timeRange";
import formatDate from "../../../utils/isoDateConverter";
import useGetOccupancyPerTimeReport from "../../../services-hooks/reports/occupancy-per-time";
import ExportToCSV from "../../export-to-csv";
import { occupancyPerTimeReportExportFormater } from "../../../utils/export-formerter-functions";
import ApartmentThroughBuildingSelector from "../../inputs/select/apartment-through-building-selector";
import useExtractUrlParams from "../../../useHooks/extract-url-query-params";
import TableTemplate from "../table-template";
import { occupancyTimeReportList } from "../../../types/apiData/reports";

export default function OccupancyPerTimeReportTable() {
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
  const { data, isLoading, retryFunction, pagination } =
    useGetOccupancyPerTimeReport({
      page,
      apartmentId: buildingId && apartmentId ? String(apartmentId) : "",
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
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

  // const { data: reportSummary } = useGetReportSummary({
  //   apartmentId: String(apartmentId || ""),
  //   start_date: filterDates?.start_date,
  //   end_date: filterDates?.end_date,
  // });

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-center justify-between flex-col md:flex-row gap-4 p-4 rounded-md border flex-wrap lg:flex-nowrap">
        <div>
          <Filter actionHandler={handleCustomersFiltering} />
        </div>
        <div>
          <TimeRangeSelector />
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
            jsonToCSVReformerter={occupancyPerTimeReportExportFormater}
            fileName="ocupancy-per-time-report-list"
          />
        </div>
      </div>
      <TableTemplate
        data={data}
        isLoading={isLoading}
        columns={[
          {
            header: "Date",
            key: "date",
            showColumnSort: true,
            render: (row: occupancyTimeReportList) => (
              <span>{formatDate(row?.date)}</span>
            ),
          },
          {
            header: "Apartment",
            key: "apartment",
            showColumnSort: true,
            render: (row: occupancyTimeReportList) => (
              <span>{row?.shortlet_name}</span>
            ),
          },
          {
            header: "Occupancy Status",
            key: "occupancy_status",
            showColumnSort: true,
            render: (row: occupancyTimeReportList) => (
              <span>{row?.occupancy_status}</span>
            ),
          },
          {
            header: "Occupant Name",
            key: "occupant_name",
            showColumnSort: true,
            render: (row: occupancyTimeReportList) => (
              <span>{row?.occupant_name}</span>
            ),
          },
          {
            header: "Number of Guests",
            key: "no_of_guest",
            showColumnSort: true,
            render: (row: occupancyTimeReportList) => (
              <span>{row?.number_of_guests}</span>
            ),
          },
          {
            header: "Check-in Date",
            key: "check_in",
            showColumnSort: true,
            render: (row: occupancyTimeReportList) => (
              <span>
                {row?.check_in_date ? formatDate(row?.check_in_date) : ""}
              </span>
            ),
          },
          {
            header: "Check-out Date",
            key: "check_out",
            showColumnSort: true,
            render: (row: occupancyTimeReportList) => (
              <span>
                {row?.check_in_date ? formatDate(row?.check_out_date) : ""}
              </span>
            ),
          },
        ]}
        showPaginator={true}
        pagination={pagination}
      />
    </div>
  );
}
