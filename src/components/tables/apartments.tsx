import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import Status from "../status";
import LocationPinIcon from "../../assets/icons/location";
import Pagination from "../pagination";
import ModalTemplate from "../modal";
import QuickReservationFlow from "../quickReservationFlow";
import CheckAvailability from "../check-availability";
import CalendarIcon from "../../assets/icons/calendar";
import Search from "../inputs/search";
import AssignCustomer from "../quickReservationFlow/assignToCustomer";
import { useAppSelector } from "../../stores/hooks";
import formatDate, { formatTime } from "../../utils/isoDateConverter";
import NoResult from "../noResult";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetTopApartmentLists from "../../services-hooks/dashboards/useGetTopApartment";
import ChevronRightIcon from "../../assets/icons/chevron-right";
import { apartment } from "../../types/apiData/apartment";

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
  const [openAvailability, setOpenAvailability] = useState(false);

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

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Search
            placeholder="Apartment name, type, location..."
            id="apartment-search"
          />
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
                {data.map((request, index) => {
                  return (
                    <tr key={request?.id} className=" border-b">
                      <td className=" min-w-16">{index + 1}</td>
                      <td className=" flex gap-2 items-center min-w-36">
                        <img
                          src={"/logo_blue.png"}
                          alt={request?.name}
                          className=" h-10 w-10 rounded aspect-square"
                        />
                        <span className=" flex flex-col gap-1">
                          <span>{request?.name}</span>
                          <span className=" text-xs text-gray-500 flex items-center gap-1">
                            <LocationPinIcon className=" h-3 w-3" />
                            {request?.location}
                          </span>
                        </span>
                      </td>
                      <td className=" text-lg  min-w-36">{`${request?.currency} ${request?.price}`}</td>
                      <td>{`${formatDate(
                        request?.last_booking_date
                      )} ${formatTime(request?.last_booking_date)}`}</td>
                      <td>{request?.no_of_bookings}</td>
                      <td>
                        <Status status={request?.availability_status} />
                      </td>
                      <td className=" group relative">
                        <span className=" p-2 text-lg bg-primary/15  rounded-lg">
                          ...
                        </span>
                        <span className="z-10 group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                          <Link
                            to={`/apartments-details/${request?.id}`}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            View Details
                          </Link>
                          <button
                            type="button"
                            onClick={() => setOpenReservation(true)}
                            className="text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Quick Reservation
                          </button>
                          <button
                            type="button"
                            onClick={() => setOpenAvailability(true)}
                            className="text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Calculate Rate
                          </button>
                          <Link
                            to={`/edit-apartment/apartment-details/${request?.id}`}
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
          <MobileTable
            data={data}
            setOpenAvailability={setOpenAvailability}
            setOpenReservation={setOpenReservation}
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
          {openAssignToCustomerView ? (
            <AssignCustomer />
          ) : (
            <QuickReservationFlow />
          )}
        </div>
      </ModalTemplate>

      {/*check availability */}
      <ModalTemplate
        open={openAvailability}
        setOpen={setOpenAvailability}
        showXicon={true}
        titleIcon={<CalendarIcon />}
        title="Check Availability"
        className=" max-w-md"
      >
        <div className="w-full">
          <CheckAvailability />
        </div>
      </ModalTemplate>
    </>
  );
}

function MobileTable({
  data,
  setOpenReservation,
  setOpenAvailability,
}: {
  data: apartment[];
  setOpenReservation: Function;
  setOpenAvailability: Function;
}) {
  return (
    <div className=" w-full flex flex-col gap-4">
      <div className=" flex items-center justify-between py-3 font-semibold text-gray-500 text-sm bg-gray-100  px-3">
        <span>Name</span>
        <span>Status</span>
      </div>
      {data.map((item, index) => {
        return (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="text-sm flex flex-col">
                <Disclosure.Button
                  className={`${
                    open ? " bg-gray-100" : ""
                  } flex px-5 py-4 w-full justify-between items-center transition-all gap-4 text-left font-medium focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75`}
                >
                  <div className={`flex items-center gap-3`}>
                    <ChevronRightIcon
                      className={`w-4 h-4 ${
                        open ? "rotate-90 transform" : "rotate-0"
                      } text-black`}
                    />
                    <p className="">{item.name}</p>
                  </div>
                  <Status status={item?.availability_status} />
                </Disclosure.Button>
                <Disclosure.Panel className="w-full">
                  <div className="w-full flex items-center justify-between  px-2 bg-primary/5 py-4">
                    <p className="">
                      {item?.currency} {item.price}/Night
                    </p>

                    <div className=" group relative">
                      <span className=" p-2 text-lg bg-primary/15  rounded-lg">
                        ...
                      </span>
                      <span className="z-10 group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <Link
                          to={`/apartments-details/${item?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          View Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => setOpenReservation(true)}
                          className="text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Quick Reservation
                        </button>
                        <button
                          type="button"
                          onClick={() => setOpenAvailability(true)}
                          className="text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Calculate Rate
                        </button>
                        <Link
                          to={`/edit-apartment/apartment-details/${item?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Apartment
                        </Link>
                      </span>
                    </div>
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
}
