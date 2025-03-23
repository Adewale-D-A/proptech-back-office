import { useCallback, useState } from "react";
import Filter from "../../filterAndSort/filter";
// import Search from "../../inputs/search";
import { apartmentById } from "../../../types/apiData/apartment";
import LoadingButton from "../../button";
import ExportSelect from "../../inputs/select/exportSelect";
import { revenueReportList } from "../../../types/apiData/reports";
import NoResult from "../../noResult";
import Pagination from "../../pagination";
import formatDate from "../../../utils/isoDateConverter";
import useGetRevenueReport from "../../../services-hooks/reports/revenue";
import useGetReportSummary from "../../../services-hooks/reports/report-summary";
import ApartmentSingleSearch from "../../inputs/search/apartment-single-search";
import { useAppDispatch } from "../../../stores/hooks";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import ExportToCSV from "../../export-to-csv";
import { revenueReportExportFormater } from "../../../utils/export-formerter-functions";

export default function RevenueReportTable() {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const dispatch = useAppDispatch();
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetRevenueReport({
      page: currentPage,
      apartmentId: String(apartment?.id || ""),
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
    });

  const handleLoadData = useCallback(() => {
    if (apartment?.id) {
      retryFunction();
    } else {
      dispatch(
        openSnackbar({
          message: "Please select an apartment to view its reports",
          isError: true,
        })
      );
    }
  }, [apartment?.id]);

  const { data: reportSummary } = useGetReportSummary({
    apartmentId: String(apartment?.id || ""),
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
        <ApartmentSingleSearch
          placeholder="Apartment name..."
          selected={apartment}
          setSelected={setApartment}
        />
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
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-auto ">
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
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
              <tbody>
                {data.map((item: revenueReportList, index: number) => {
                  return (
                    <tr key={index} className=" border-b">
                      <td>{formatDate(item?.date)}</td>
                      <td>{item?.rooms_sold}</td>
                      <td>{item?.nights_booked}</td>
                      <td>***</td>
                      <td>{item?.occupancy_rate}</td>
                      <td>{item?.ibe_revenue}</td>
                      <td>{item?.ota_revenue}</td>
                      <td>{item?.adr}</td>
                      <td>{item?.revpar}</td>
                      <td>{item?.taxes}</td>
                    </tr>
                  );
                })}
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
                  <td>{reportSummary?.total_revenue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <NoResult title="No data found" message="No data available" />
        )}
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="Revenue report"
        />
      </div>
    </div>
  );
}
