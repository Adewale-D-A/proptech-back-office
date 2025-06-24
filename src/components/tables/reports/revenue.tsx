import { useCallback, useState } from "react";
import Filter from "../../filterAndSort/filter";
import LoadingButton from "../../button";
import { revenueReportList } from "../../../types/apiData/reports";
import Pagination from "../../pagination";
import formatDate from "../../../utils/isoDateConverter";
import useGetRevenueReport from "../../../services-hooks/reports/revenue";
import useGetReportSummary from "../../../services-hooks/reports/report-summary";
import ExportToCSV from "../../export-to-csv";
import { revenueReportExportFormater } from "../../../utils/export-formerter-functions";
import ApartmentThroughBuildingSelector from "../../inputs/select/apartment-through-building-selector";
import useExtractUrlParams from "../../../useHooks/extract-url-query-params";
import TableTemplate from "../table-template";

export default function RevenueReportTable() {
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
  const { data, isLoading, retryFunction, pagination } = useGetRevenueReport({
    page,
    apartmentId: buildingId && apartmentId ? String(apartmentId) : "",
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    limit: size,
  });

  const handleLoadData = useCallback(() => {
    retryFunction();
  }, [apartmentId]);

  const { data: reportSummary } = useGetReportSummary({
    apartmentId: String(apartmentId || ""),
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
  });

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
        </div>
        <ExportToCSV
          dataset={data}
          jsonToCSVReformerter={revenueReportExportFormater}
          fileName="revenue-report-list"
        />
      </div>
      {/* table */}{" "}
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 overflow-auto ">
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Date",
              key: "date",
              showColumnSort: true,
              render: (row: revenueReportList) => (
                <span>{formatDate(row?.date)}</span>
              ),
            },
            {
              header: "Rooms Sold",
              key: "rooms",
              showColumnSort: true,
              render: (row: revenueReportList) => (
                <span>{row?.rooms_sold}</span>
              ),
            },
            {
              header: "Nights Books",
              key: "nights_booked",
              showColumnSort: true,
              render: (row: revenueReportList) => (
                <span>{row?.nights_booked}</span>
              ),
            },
            {
              header: "Total Bookings",
              key: "total_bookings",
              showColumnSort: true,
              render: (row: revenueReportList) => (
                <span>{row?.rooms_sold}</span>
              ),
            },
            {
              header: "%Occupancy",
              key: "occupancy",
              showColumnSort: true,
              render: (row: revenueReportList) => (
                <span>{row?.occupancy_rate}</span>
              ),
            },
            {
              header: "IBE Revenue",
              key: "ibe_revenue",
              showColumnSort: true,
              render: (row: revenueReportList) => (
                <span>{row?.ibe_revenue}</span>
              ),
            },
            {
              header: "OTA Revenue",
              key: "ota",
              showColumnSort: true,
              render: (row: revenueReportList) => (
                <span>{row?.ota_revenue}</span>
              ),
            },
            {
              header: "ADR",
              key: "adr",
              showColumnSort: true,
              render: (row: revenueReportList) => <span>{row?.adr}</span>,
            },
            {
              header: "REVPAR",
              key: "revpar",
              showColumnSort: true,
              render: (row: revenueReportList) => <span>{row?.revpar}</span>,
            },
            {
              header: "Taxes/Fees",
              key: "tax",
              showColumnSort: true,
              render: (row: revenueReportList) => <span>{row?.taxes}</span>,
            },
            {
              header: "Revenue",
              key: "revenue",
              showColumnSort: true,
              render: (row: revenueReportList) => <span>{row?.revenue}</span>,
            },
          ]}
          showPaginator={false}
        />{" "}
        <table className=" w-full">
          <thead>
            <tr className=" opacity-0">
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
        </table>
        <Pagination pagination={pagination} isLoading={isLoading} />
      </div>
    </div>
  );
}
