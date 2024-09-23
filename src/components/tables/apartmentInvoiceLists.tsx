import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import Search from "../inputs/search";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import Status from "../status";
import { useAppDispatch } from "../../stores/hooks";
import useGetAllInvoiceLists from "../../services-hooks/useGetAllInvoiceLists";
import { removeInvoiceInList } from "../../stores/apiData/invoice-lists";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";

export default function InvoiceListsTable({ header }: { header: string[] }) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllInvoiceLists({ page: currentPage });

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const deleteApartment = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removeInvoiceInList({ id: selectedId }));
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
          <h2 className="text-xl font-semibold">Invoice List</h2>
          <Search
            placeholder="Invoice name, booking ID..."
            id="apartment-search"
          />
          <Filter />
          <Sort id="sort-by" label="Sort by" />
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
                    <td>{request?.number}</td>
                    <td>{request?.bookingId}</td>
                    <td>{request?.email}</td>
                    <td>{request?.createdOn}</td>
                    <td>{request?.createdBy}</td>
                    <td>
                      <Status status={request?.status} />
                    </td>
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <Link
                          to={`/booking-details/${request?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          View Booking
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(request?.id);
                            setOpenDeleteConfirmation(true);
                          }}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Invoice
                        </button>
                        <Link
                          to={`#`}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Download Invoice
                        </Link>
                        <Link
                          to={`#}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Resend Via E-mail
                        </Link>
                        <Link
                          to={`#}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          View Booking Details
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
          label="Invoices"
        />
      </div>
      <DeleteConfirmation
        confirmationHandler={deleteApartment}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Invoice"
        description="Are you sure you want to delete this invoice"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
