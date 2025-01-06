import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Status from "../status";
import LocationPinIcon from "../../assets/icons/location";
import Pagination from "../pagination";
import ModalTemplate from "../modal";
import QuickReservationFlow from "../quickReservationFlow";
import CalendarIcon from "../../assets/icons/calendar";
import Search from "../inputs/search";
import AssignCustomer from "../quickReservationFlow/assignToCustomer";
import { useAppSelector } from "../../stores/hooks";
import formatDate, { formatTime } from "../../utils/isoDateConverter";
import NoResult from "../noResult";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetTopApartmentLists from "../../services-hooks/dashboards/useGetTopApartment";
import CalculateRate from "../check-availability/calculate-rate";
import MobileTopApartmentTable from "./mobile/top-apartment";

export default function ApartmentTable({
  header,
  title,
}: {
  header: string[];
  title: string;
}) {
  const { open: openAssignToCustomerView } = useAppSelector(
    (state) => state.assignCustomer.value
  );

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [openReservation, setOpenReservation] = useState(false);
  const [openRate, setOpenRate] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [apartmentName, setApartmentName] = useState("");

  const { data, pagination, isLoading } = useGetTopApartmentLists({
    page: currentPage,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort: sort,
  });

  const handleSalesFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

  const handleOpenCalculateRate = useCallback((id: number) => {
    setSelectedId(String(id || ""));
    setOpenRate(true);
  }, []);

  const handleOpenQuickReservation = useCallback((id: number, name: string) => {
    setSelectedId(String(id || ""));
    setApartmentName(name);
    setOpenReservation(true);
  }, []);

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">{title}</h2>
          {/* <Search
            placeholder="Apartment name, type, location..."
            id="apartment-search"
            componentId="apartment"
          /> */}
          <div className=" flex items-center gap-3 text-sm text-gray-500 flex-col md:flex-row">
            <Filter actionHandler={handleSalesFiltering} />
            <Sort setSort={setSort} id={"sales-analytics"} label={"Sort by:"} />
          </div>
        </div>
        <div className="hidden md:block px-5">
          {data && data.length > 0 ? (
            <table className=" w-full overflow-x-auto">
              <thead className="">
                <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                  {header.map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {data.map((item, index) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td className=" min-w-16">{index + 1}</td>
                      <td className=" flex gap-2 items-center min-w-36">
                        <img
                          src={"/logo_blue.png"}
                          alt={item?.name}
                          className=" h-10 w-10 rounded aspect-square"
                        />
                        <span className=" flex flex-col gap-1">
                          <span>{item?.name}</span>
                          <span className=" text-xs text-gray-500 flex items-center gap-1">
                            <LocationPinIcon className=" h-3 w-3" />
                            {item?.location}
                          </span>
                        </span>
                      </td>
                      <td className=" text-lg  min-w-36">{`${item?.currency} ${item?.price}`}</td>
                      <td>
                        {item?.last_booking_date
                          ? `${formatDate(
                              item?.last_booking_date
                            )} ${formatTime(item?.last_booking_date)}`
                          : ""}
                      </td>
                      <td>{item?.no_of_bookings}</td>
                      <td>
                        <Status status={item?.availability_status} />
                      </td>
                      <td className=" group relative">
                        <span className=" p-2 text-lg bg-primary/15  rounded-lg">
                          ...
                        </span>
                        <span className="z-10 group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                          <Link
                            to={`/apartments/apartment-details/${item?.id}`}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            View Details
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenQuickReservation(item?.id, item?.name)
                            }
                            className="text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Quick Reservation
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenCalculateRate(item?.id)}
                            className="text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Calculate Rate
                          </button>
                          <Link
                            to={`/apartments/edit-apartment/apartment-details/${item?.id}`}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Edit Apartment
                          </Link>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <NoResult />
          )}
        </div>
        <div className="w-full block md:hidden">
          <MobileTopApartmentTable
            data={data}
            setOpenCalculateRate={handleOpenCalculateRate}
            setOpenReservation={handleOpenQuickReservation}
          />
        </div>
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="Apartments"
        />
      </div>

      {/* make reservation */}
      <ModalTemplate
        open={openReservation}
        setOpen={setOpenReservation}
        showXicon={openAssignToCustomerView}
        className={openAssignToCustomerView ? " max-w-md" : ""}
        title={
          openAssignToCustomerView ? "Assign Customer" : "Quick Reservation"
        }
      >
        <div className="w-full">
          <QuickReservationFlow
            apartment_id={selectedId}
            apartment_name={apartmentName}
            setOpen={setOpenReservation}
          />
        </div>
      </ModalTemplate>

      {/*check availability */}
      <ModalTemplate
        open={openRate}
        setOpen={setOpenRate}
        showXicon={true}
        titleIcon={<CalendarIcon />}
        title="Calculate rate"
        className=" max-w-md"
      >
        <div className="w-full">
          <CalculateRate apartmentId={selectedId} setIsOpen={setOpenRate} />
        </div>
      </ModalTemplate>
    </>
  );
}
