import { useState } from "react";
import { apartmentById } from "../../../types/apiData/apartment";
import Filter from "../../filterAndSort/filter";
import Select from "../../inputs/select";
import Search from "../../inputs/search";
import LoadingButton from "../../button";
import ExportSelect from "../../inputs/select/exportSelect";
import useGetAllReportsLists from "../../../services-hooks/useGetReportList";
import { revenueReportList } from "../../../types/apiData/reports";
import NoResult from "../../noResult";
import Pagination from "../../pagination";

export default function DailyRoomReportTable() {
  const [apartment, setApartment] = useState<apartmentById>({} as any);
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllReportsLists({ page: currentPage, type: "daily-room" });

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-center justify-between flex-col md:flex-row gap-4 p-4 rounded-md border flex-wrap lg:flex-nowrap">
        <div>
          <Filter />
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
      {/* table */}{" "}
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
            <div className=" flex items-center gap-4 font-semibold flex-wrap">
              {[
                {
                  id: 1,
                  label: "Arriving",
                  value: 12,
                },
                {
                  id: 2,
                  label: "Departing",
                  value: 0,
                },
                {
                  id: 3,
                  label: "Stayover",
                  value: 131,
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
          label="Entries"
        />
      </div>
    </div>
  );
}
