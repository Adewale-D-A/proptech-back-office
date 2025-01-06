import { useCallback, useState } from "react";
import LoadingButton from "../../button";
import Filter from "../../filterAndSort/filter";
import Search from "../../inputs/search";
import ExportSelect from "../../inputs/select/exportSelect";
import TimeRangeSelector from "../../inputs/select/timeRange";
import { apartmentById } from "../../../types/apiData/apartment";
import NoResult from "../../noResult";
import Pagination from "../../pagination";
import formatDate from "../../../utils/isoDateConverter";
import useGetOccupancyPerTimeReport from "../../../services-hooks/reports/occupancy-per-time";
import useGetReportSummary from "../../../services-hooks/reports/report-summary";
import Status from "../../status";

export default function OccupancyPerTimeReportTable() {
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetOccupancyPerTimeReport({
      page: currentPage,
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

  const { data: reportSummary } = useGetReportSummary({
    apartmentId: String(apartment?.id || ""),
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
  });

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-center justify-between flex-col md:flex-row gap-4 p-4 rounded-md border flex-wrap lg:flex-nowrap">
        <div>
          <Filter actionHandler={handleCustomersFiltering} />
        </div>
        <div>
          <TimeRangeSelector />
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
            clickHandler={() => retryFunction()}
          />
          <ExportSelect id="report" />
        </div>
      </div>
      {/* table */}{" "}
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-auto ">
        {data && data.length > 0 && apartment?.id ? (
          <>
            <table className=" w-full text-xs overflow-x-auto">
              <thead className="">
                <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                  {[
                    "Date",
                    "Apartment",
                    "Occupancy Status",
                    "Occupant Name",
                    "Number of Guests",
                    "Check-in Date",
                    "Check-out Date",
                  ].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {data.map((request, index) => {
                  return (
                    <tr key={index} className=" border-b">
                      <td>{formatDate(request?.date)}</td>
                      <td>{request?.shortlet_name}</td>
                      <td>
                        <Status status={request?.occupancy_status} />
                      </td>
                      <td>{request?.occupant_name}</td>
                      <td>{request?.number_of_guests}</td>
                      <td>{formatDate(request?.check_in_date)}</td>
                      <td>{formatDate(request?.check_out_date)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <div className=" flex items-center gap-4 font-semibold flex-wrap">
              {[
                {
                  id: 1,
                  label: "Occupied",
                  value: 0,
                },
                {
                  id: 2,
                  label: "Vacant",
                  value: 0,
                },
                {
                  id: 3,
                  label: "No of Guests",
                  value: 0,
                },
                {
                  id: 4,
                  label: "No of Nights",
                  value: 0,
                },
              ].map((item) => (
                <h6 key={item?.id}>
                  {item?.label} {item?.value}
                </h6>
              ))}
            </div> */}
          </>
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
    </div>
  );
}
