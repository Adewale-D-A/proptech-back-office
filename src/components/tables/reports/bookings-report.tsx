import { useState } from "react";
import TableSearch from "../../inputs/search/table-search";
import Status from "../../status";
import useGetAllBookingsLists from "../../../services-hooks/useGetAllBookingsLists";
import formatDate from "../../../utils/isoDateConverter";
import { Link } from "react-router-dom";
import BookingsFilterSearch from "../../filterAndSort/bookings-filter";
import ExportToCSV from "../../export-to-csv";
import { bookingsExportFormater } from "../../../utils/export-formerter-functions";
import useExtractUrlParams from "../../../useHooks/extract-url-query-params";
import TableTemplate from "../table-template";
import { bookingsById } from "../../../types/apiData/bookings";
import TableActionDropDown from "../../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function BookingsReportListTable() {
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
  return (
    <div className=" w-full flex flex-col gap-3">
      <div className="w-full flex justify-between gap-4 flex-col md:flex-row">
        <div className=" max-w-md">
          <TableSearch placeholder="Search..." />
        </div>
        <BookingsFilterSearch />
      </div>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <div className=" flex items-center gap-4">
            <h2 className="text-xl font-semibold">Bookings</h2>
            <span className=" text-primary p-1 px-2 bg-primary/10 rounded-xl text-xs font-semibold">
              {pagination?.total} total
            </span>
          </div>
          <div>
            <ExportToCSV
              dataset={data}
              jsonToCSVReformerter={bookingsExportFormater}
              fileName="bookings-report-list"
            />
          </div>
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Customer Name",
              key: "customer_name",
              showColumnSort: false,
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
              showColumnSort: false,
              render: (row: bookingsById) => <span>{row?.shortlet?.name}</span>,
            },
            {
              header: "Amount",
              key: "amount",
              showColumnSort: false,
              render: (row: bookingsById) => (
                <span>
                  {row?.currency} {row?.total_price}
                </span>
              ),
            },
            {
              header: "Check-in Date",
              key: "check_in_date",
              showColumnSort: false,
              render: (row: bookingsById) => (
                <span>
                  {formatDate(row?.check_in_date)} {row?.check_in_time}
                </span>
              ),
            },
            {
              header: "Check-out Date",
              key: "check_out_date",
              showColumnSort: false,
              render: (row: bookingsById) => (
                <span>
                  {formatDate(row?.check_out_date)} {row?.check_out_time}
                </span>
              ),
            },
            {
              header: "Status",
              key: "status",
              showColumnSort: false,
              render: (row: bookingsById) => <Status status={row?.status} />,
            },
            {
              header: "Action",
              key: "action",
              render: (row: bookingsById) => (
                <TableActionDropDown>
                  <>
                    <MenuItem>
                      <Link
                        to={`/bookings/booking-details/${row?.id}`}
                        className=" px-4 py-2 border font-semibold"
                      >
                        View
                      </Link>
                    </MenuItem>
                  </>
                </TableActionDropDown>
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
