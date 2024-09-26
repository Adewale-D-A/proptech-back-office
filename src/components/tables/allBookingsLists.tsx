import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import Search from "../inputs/search";
import FilterSearch from "../filterAndSort/filter-search";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import Status from "../status";
import useGetAllBookingsLists from "../../services-hooks/useGetAllBookingsLists";
import { useAppDispatch } from "../../stores/hooks";
import { removeBookingsInList } from "../../stores/apiData/bookings-lists";
import ModalTemplate from "../modal";
import BookingDetailSummary from "../booking-detail";

export default function AllBookingsListTable({ header }: { header: string[] }) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllBookingsLists({ page: currentPage });
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openBookingDetailSummary, setOpenBookingDetailSummary] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const deleteApartment = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removeBookingsInList({ id: selectedId }));

      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <Search
            placeholder="Apartment name, type, location..."
            id="apartment-search"
          />
          <FilterSearch />
        </div>
        {data && data.length > 0 ? (
          <table className=" w-full text-xs overflow-x-auto">
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
                    <td>
                      <span className=" rounded-full p-2 border border-primary">
                        {request?.id}
                      </span>
                    </td>
                    <td>{request?.customerName}</td>
                    <td>{request?.apartnmentName}</td>
                    <td>{request?.bookingDate}</td>
                    <td>{request?.amount}</td>
                    <td>{request?.exchangeRate}</td>
                    <td>{request?.checkIn}</td>
                    <td>{request?.checkOut}</td>
                    <td>
                      <Status status={request?.status} />
                    </td>
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <button
                          onClick={() => {
                            setSelectedId(request?.id);
                            setOpenBookingDetailSummary(true);
                          }}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          View Booking
                        </button>
                        <Link
                          to={`/edit-apartment/apartment-details/${request?.id}`}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Booking
                        </Link>
                        <Link
                          to={`/apartment-caledar/${request?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Generate Invoice
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(request?.id);
                            setOpenDeleteConfirmation(true);
                          }}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Booking
                        </button>
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
          label="bookings"
        />
      </div>
      <DeleteConfirmation
        confirmationHandler={deleteApartment}
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
