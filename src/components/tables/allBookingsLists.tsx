import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import Status from "../status";
import useGetAllBookingsLists from "../../services-hooks/useGetAllBookingsLists";
import { useAppDispatch } from "../../stores/hooks";
import { removeBookingsInList } from "../../stores/apiData/bookings-lists";
import ModalTemplate from "../modal";
import BookingDetailSummary from "../booking-detail";
import formatDate from "../../utils/isoDateConverter";
import MobileBookingsTable from "./mobile/bookings";
import TableSearch from "../inputs/search/table-search";
import BookingsFilterSearch from "../filterAndSort/bookings-filter";
import { BookingFilterPayload } from "../../types/apiData/bookings/booking-filter-options";
import ExportToCSV from "../export-to-csv";
import { bookingsExportFormater } from "../../utils/export-formerter-functions";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";

export default function AllBookingsListTable({ header }: { header: string[] }) {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<BookingFilterPayload>();
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllBookingsLists({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
      ...filter,
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

  const openDelete = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenDeleteConfirmation(true);
  }, []);

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
            <TableSearch
              setValue={setSearch}
              placeholder="Search name, type, location..."
            />
          </div>
          <BookingsFilterSearch setData={setFilter} />
          <ExportToCSV
            dataset={data}
            jsonToCSVReformerter={bookingsExportFormater}
            fileName="bookings-list"
          />
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {header.map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td>
                        <Link
                          to={`/bookings/booking-details/edit-reservation/${item?.id}`}
                          className=" rounded-full p-2 border border-primary"
                        >
                          {item?.id}
                        </Link>
                      </td>
                      <td>
                        {item?.user?.first_name} {item?.user?.last_name}
                      </td>
                      <td>{item?.shortlet?.name}</td>
                      <td>{formatDate(item?.created_at)}</td>
                      <td>
                        {item?.currency} {item?.total_price}
                      </td>
                      <td>{item?.exchange_rate}</td>
                      <td>
                        {formatDate(item?.check_in_date)} {item?.check_in_time}
                      </td>
                      <td>
                        {formatDate(item?.check_out_date)}{" "}
                        {item?.check_out_time}
                      </td>
                      <td>
                        <Status status={item?.status} />
                      </td>
                      <td className=" group relative">
                        <span className=" p-2 bg-primary/15 rounded-lg">
                          ...
                        </span>
                        <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                          <button
                            onClick={() => openSummary(item?.id)}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            View Booking
                          </button>
                          {booking?.update && (
                            <Link
                              to={`/bookings/booking-details/edit-reservation/${item?.id}`}
                              className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                            >
                              Edit Booking
                            </Link>
                          )}
                          {/* <Link
                            to={`/apartment-caledar/${item?.id}`}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Generate Invoice
                          </Link> */}
                          {/* <button
                            type="button"
                            onClick={() => openDelete(item?.id)}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Delete Booking
                          </button> */}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <NoResult />
        )}
        {/* <div className="w-full block md:hidden">
          <MobileBookingsTable
            data={data}
            openDelete={openDelete}
            openSummary={openSummary}
          />
        </div> */}
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="bookings"
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
