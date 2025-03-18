import { useCallback, useState } from "react";
import { apartmentById } from "../../../types/apiData/apartment";
import Filter from "../../filterAndSort/filter";
import Select from "../../inputs/select";
import Search from "../../inputs/search";
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

export default function DailyRoomReportTable() {
  const [type, setType] = useState("");

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
      group: "day",
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
          {" "}
          <Filter actionHandler={handleCustomersFiltering} />
        </div>
        <div>
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
          <ExportToCSV
            dataset={data}
            jsonToCSVReformerter={revenueReportExportFormater}
            fileName="daily-room-report-list"
          />
        </div>
      </div>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-auto ">
        {data && data.length > 0 ? (
          <>
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
                {data.map((request: revenueReportList, index: number) => {
                  return (
                    <tr key={index} className=" border-b">
                      <td>{formatDate(request?.date)}</td>
                      <td>{request?.rooms_sold}</td>
                      <td>{request?.nights_booked}</td>
                      <td>***</td>
                      <td>{request?.occupancy_rate}</td>
                      <td>{request?.ibe_revenue}</td>
                      <td>{request?.ota_revenue}</td>
                      <td>{request?.adr}</td>
                      <td>{request?.revpar}</td>
                      <td>{request?.taxes}</td>
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
            <div className=" flex items-center gap-4 font-semibold flex-wrap">
              {[
                {
                  id: 1,
                  label: "Arriving",
                  value: 0,
                },
                {
                  id: 2,
                  label: "Departing",
                  value: 0,
                },
                {
                  id: 3,
                  label: "Stayover",
                  value: 0,
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
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="Daily room reports"
        />
      </div>
    </div>
  );
}
