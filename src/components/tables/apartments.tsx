import { Link } from "react-router-dom";
import Status from "../status";
import LocationPinIcon from "../../assets/icons/location";
import FilterSort from "../filterAndSort";
import Pagination from "../pagination";
import { useState } from "react";
import ModalTemplate from "../modal";
import QuickReservationFlow from "../quickReservationFlow";
import CheckAvailability from "../check-availability";
import CalendarIcon from "../../assets/icons/calendar";
import Search from "../inputs/search";
import AssignCustomer from "../quickReservationFlow/assignToCustomer";
import { useAppSelector } from "../../stores/hooks";

export default function ApartmentTable({
  header,
  data,
  title,
}: {
  header: string[];
  data: {
    id: string;
    apartmentInfo: {
      name: string;
      image: string;
      location: string;
    };
    pricePerNight: string;
    lastBooking: string;
    totalBookings: string;
    availabilityStatus: string;
  }[];
  title: string;
}) {
  const { open: openAssignToCustomerView } = useAppSelector(
    (state) => state.assignCustomer.value
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [openReservation, setOpenReservation] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);

  const [assignToCustomer, setAssignToCustomer] = useState(false);

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Search
            placeholder="Apartment name, type, location..."
            id="apartment-search"
          />
          <FilterSort sortId="top-apartment" sortLabel="Sort by:" />
        </div>
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
                      src={request?.apartmentInfo?.image}
                      alt={request?.apartmentInfo?.name}
                      className=" h-10 w-10 rounded aspect-square"
                    />
                    <span className=" flex flex-col gap-1">
                      <span>{request?.apartmentInfo?.name}</span>
                      <span className=" text-xs text-gray-500 flex items-center gap-1">
                        <LocationPinIcon className=" h-3 w-3" />
                        {request?.apartmentInfo?.location}
                      </span>
                    </span>
                  </td>
                  <td className=" text-lg  min-w-36">
                    {request?.pricePerNight}
                  </td>
                  <td>{request?.lastBooking}</td>
                  <td>{request?.totalBookings}</td>
                  <td>
                    <Status status={request?.availabilityStatus} />
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
        <Pagination
          pagination={{
            current_page: 1,
            last_page: 2,
            per_page: 20,
            total: 24,
            from: 1,
            to: 1,
          }}
          setCurrentPage={setCurrentPage}
          isLoading={false}
          label="Apartment"
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
