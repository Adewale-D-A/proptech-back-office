import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Status from "../status";
import LocationPinIcon from "../../assets/icons/location";
import ModalTemplate from "../modal";
import QuickReservationFlow from "../quickReservationFlow";
import CalendarIcon from "../../assets/icons/calendar";
import { useAppSelector } from "../../stores/hooks";
import formatDate, { formatTime } from "../../utils/isoDateConverter";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetTopApartmentLists from "../../services-hooks/dashboards/useGetTopApartment";
import CalculateRate from "../check-availability/calculate-rate";
import paginatedPageSerializer from "../../utils/page-serializer";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { apartment } from "../../types/apiData/apartment";
// import MobileTopApartmentTable from "./mobile/top-apartment";

export default function ApartmentTable({ title }: { title: string }) {
  const { open: openAssignToCustomerView } = useAppSelector(
    (state) => state.assignCustomer.value
  );

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [openReservation, setOpenReservation] = useState(false);
  const [openRate, setOpenRate] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [apartmentName, setApartmentName] = useState("");

  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
  });
  const { data, pagination, isLoading } = useGetTopApartmentLists({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    limit: size,
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

  const { data: apartment } = useGetResourceAccessChecker({
    resource: "shortlet",
  });
  const { data: booking } = useGetResourceAccessChecker({
    resource: "booking",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">{title}</h2>
          {/* <Search
            placeholder="Apartment name, type, location..."
            id="apartment-search"
            componentId="apartment"
          /> */}
          <div className=" flex items-center gap-3 text-sm text-gray-500 flex-col md:flex-row">
            <Filter actionHandler={handleSalesFiltering} />
            <Sort id={"sales-analytics"} label={"Sort by:"} />
          </div>
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "S/N",
              key: "sn",
              render: (row: apartment, index) => (
                <span>
                  {paginatedPageSerializer({
                    currentPage: pagination?.current_page,
                    pageSize: pagination?.per_page,
                    index: index || 0,
                  })}
                </span>
              ),
            },
            {
              header: "Apartment Info",
              key: "apt_info",
              showColumnSort: true,
              render: (row: apartment) => (
                <div className=" flex gap-2 items-center min-w-36">
                  <img
                    src={"/logo_blue.png"}
                    alt={row?.name}
                    className=" h-7 w-7 rounded aspect-square"
                  />
                  <span className=" flex flex-col gap-1 text-sm">
                    <span>{row?.name}</span>
                    <span className=" text-xs text-gray-500 flex items-center gap-1">
                      <LocationPinIcon className=" h-3 w-3" />
                      {row?.location}
                    </span>
                  </span>
                </div>
              ),
            },
            {
              header: "Price per Night",
              key: "price_per_night",
              showColumnSort: true,
              render: (row: apartment) => (
                <span>{`${row?.currency} ${row?.price}`}</span>
              ),
            },
            {
              header: "Last Booking",
              key: "last_booking",
              showColumnSort: true,
              render: (row: apartment) => (
                <span>
                  {row?.last_booking_date
                    ? `${formatDate(row?.last_booking_date)} ${formatTime(
                        row?.last_booking_date
                      )}`
                    : ""}
                </span>
              ),
            },
            {
              header: "Total Bookings",
              key: "total_bookings",
              showColumnSort: true,
              render: (row: apartment) => <span>{row?.no_of_bookings}</span>,
            },
            {
              header: "Availability Status",
              key: "availability_status",
              showColumnSort: true,
              render: (row: apartment) => (
                <Status status={row?.availability_status} />
              ),
            },
            {
              header: "Action",
              key: "action",
              render: (row: apartment) => (
                <TableActionDropDown>
                  <>
                    <MenuItem>
                      <Link
                        to={`/apartments/apartment-details/${row?.id}`}
                        className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Details
                      </Link>
                    </MenuItem>
                    {booking?.create && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenQuickReservation(row?.id, row?.name)
                          }
                          className="text-left p-3 px-4 w-full  hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Quick Reservation
                        </button>
                      </MenuItem>
                    )}
                    {booking?.view && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => handleOpenCalculateRate(row?.id)}
                          className="text-left p-3 px-4 w-full  hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Calculate Rate
                        </button>
                      </MenuItem>
                    )}
                    {apartment?.update && (
                      <Link
                        to={`/apartments/edit-apartment/apartment-details/${row?.id}`}
                        className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Edit Apartment
                      </Link>
                    )}
                  </>
                </TableActionDropDown>
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
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
            allowApartmentUpdate={false}
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
