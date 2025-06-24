import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import Status from "../status";
import useGetAllBookingsLists from "../../services-hooks/useGetAllBookingsLists";
import { useAppDispatch } from "../../stores/hooks";
import { removeBookingsInList } from "../../stores/apiData/bookings-lists";
import ModalTemplate from "../modal";
import BookingDetailSummary from "../booking-detail";
import formatDate from "../../utils/isoDateConverter";
import TableSearch from "../inputs/search/table-search";
import BookingsFilterSearch from "../filterAndSort/bookings-filter";
import { BookingFilterPayload } from "../../types/apiData/bookings/booking-filter-options";
import ExportToCSV from "../export-to-csv";
import { bookingsExportFormater } from "../../utils/export-formerter-functions";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import { MenuItem } from "@headlessui/react";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import Sort from "../filterAndSort/sort";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { bookingsById } from "../../types/apiData/bookings";

export default function AllBookingsListTable({ header }: { header: string[] }) {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<BookingFilterPayload>();
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const [
    {
      search,
      page,
      size,
      sort,
      channel,
      currency,
      room_option,
      payment_method,
      status,
      user_verification,
    },
  ] = useExtractUrlParams({
    page: 1,
    size: 20,
    search: "",
    sort: "asc",
    channel: "",
    currency: "",
    room_option: "",
    payment_method: "",
    status: "",
    user_verification: "",
  });

  const { data, isLoading, pagination } = useGetAllBookingsLists({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    search,
    limit: size,
    channel,
    currency,
    room_option,
    payment_method,
    status,
    user_verification,
  });

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openBookingDetailSummary, setOpenBookingDetailSummary] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const openSummary = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenBookingDetailSummary(true);
  }, []);

  // const openDelete = useCallback((id: number) => {
  //   setSelectedId(String(id));
  //   setOpenDeleteConfirmation(true);
  // }, []);

  const deleteBooking = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removeBookingsInList({ id: selectedId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);
  const { data: booking } = useGetResourceAccessChecker({
    resource: "booking",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <div className=" max-w-md">
            <TableSearch placeholder="Search name, type, location..." />
          </div>
          <Sort id="sort-by" label="Sort by" defaultValue="desc" />
          <BookingsFilterSearch setData={setFilter} />
          <ExportToCSV
            dataset={data}
            jsonToCSVReformerter={bookingsExportFormater}
            fileName="bookings-list"
          />
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "ID",
              key: "id",
              showColumnSort: true,
              render: (row: bookingsById) => (
                <Link
                  to={`/bookings/booking-details/edit-reservation/${row?.id}`}
                  className=" rounded-full p-2 border border-primary"
                >
                  {row?.id}
                </Link>
              ),
            },
            {
              header: "Customer Name",
              key: "customer_name",
              showColumnSort: true,
              render: (row: bookingsById) => (
                <Link
                  to={`/customers/customer-details/${row?.user?.id}`}
                  className=" underline italic flex items-center gap-2 hover:font-bold transition-all"
                >
                  <span>
                    {row?.user?.first_name} {row?.user?.last_name}
                  </span>{" "}
                </Link>
              ),
            },
            {
              header: "Apartment Name",
              key: "apartment_name",
              showColumnSort: true,
              render: (row: bookingsById) => <span>{row?.shortlet?.name}</span>,
            },
            {
              header: "Date of Booking",
              key: "booking_date",
              showColumnSort: true,
              render: (row: bookingsById) => (
                <span>{formatDate(row?.created_at)}</span>
              ),
            },
            {
              header: "Amount",
              key: "amount",
              showColumnSort: true,
              render: (row: bookingsById) => (
                <span>
                  {row?.currency} {row?.total_price}
                </span>
              ),
            },
            {
              header: "Exchange Rate",
              key: "exchange_rate",
              render: (row: bookingsById) => <span>{row?.exchange_rate}</span>,
            },
            {
              header: "Check-in Date",
              key: "check_in_date",
              showColumnSort: true,
              render: (row: bookingsById) => (
                <span>
                  {formatDate(row?.check_in_date)} {row?.check_in_time}
                </span>
              ),
            },
            {
              header: "Check-out Date",
              key: "check_out_date",
              showColumnSort: true,
              render: (row: bookingsById) => (
                <span>
                  {formatDate(row?.check_out_date)} {row?.check_out_time}
                </span>
              ),
            },
            {
              header: "Status",
              key: "status",
              showColumnSort: true,
              render: (row: bookingsById) => <Status status={row?.status} />,
            },
            {
              header: "Action",
              key: "action",
              render: (row: bookingsById) => (
                <TableActionDropDown>
                  <>
                    <MenuItem>
                      <button
                        onClick={() => openSummary(row?.id)}
                        className="w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Booking
                      </button>
                    </MenuItem>
                    <MenuItem>
                      {booking?.update && (
                        <Link
                          to={`/bookings/booking-details/edit-reservation/${row?.id}`}
                          className=" w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Booking
                        </Link>
                      )}
                    </MenuItem>
                    {/* <MenuItem>
                              <Link
                                to={`/apartment-caledar/${row?.id}`}
                                className="w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                              >
                                Generate Invoice
                              </Link>
                            </MenuItem>
                            {booking?.delete && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => openDelete(row?.id)}
                                  className="w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Delete Booking
                                </button>
                              </MenuItem>
                            )} */}
                  </>
                </TableActionDropDown>
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
        />
      </div>
      <DeleteConfirmation
        confirmationHandler={deleteBooking}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Booking"
        description="Are you sure you want to delete this booking"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />

      <ModalTemplate
        open={openBookingDetailSummary}
        setOpen={setOpenBookingDetailSummary}
        showXicon={true}
        title="Booking Detail"
        className=" max-w-md"
      >
        <BookingDetailSummary id={selectedId} />
      </ModalTemplate>
    </>
  );
}
