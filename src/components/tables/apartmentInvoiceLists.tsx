import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import Status from "../status";
import { useAppDispatch } from "../../stores/hooks";
import useGetApartmentInvoiceLists from "../../services-hooks/invoice/useGetApartmentnvoiceLists";
import { removeInvoiceInList } from "../../stores/apiData/invoice/invoice-lists";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import formatDate from "../../utils/isoDateConverter";
import TableSearch from "../inputs/search/table-search";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import ExportToCSV from "../export-to-csv";
import { apartmentInvoiceExportFormater } from "../../utils/export-formerter-functions";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function InvoiceListsTable({ header }: { header: string[] }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  // const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetApartmentInvoiceLists({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
    });
  const handleCustomersFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const selectForDelete = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenDeleteConfirmation(true);
  }, []);

  const deleteInvoice = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/invoice/${selectedId}`);
      dispatch(removeInvoiceInList({ id: selectedId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const resendInvoice = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.post(`/admin/resend/${selectedId}`);
      dispatch(
        openSnackbar({
          message: "Invoice successfully sent via email",
          isError: false,
        })
      );
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: invoice } = useGetResourceAccessChecker({
    resource: "invoice",
  });

  const { data: booking_email } = useGetResourceAccessChecker({
    resource: "booking-email",
  });
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Invoice List</h2>
          <div>
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
          <div className=" flex items-center gap-2 flex-col md:flex-row">
            <Filter actionHandler={handleCustomersFiltering} />
            <Sort setSort={setSort} id="sort-by" label="Sort by" />
            <ExportToCSV
              dataset={data}
              jsonToCSVReformerter={apartmentInvoiceExportFormater}
              fileName="apartment-invoice-list"
            />
          </div>
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
              {data.map((item, index) => {
                return (
                  <tr key={item?.id} className=" border-b">
                    <td>{item?.invoice_number}</td>
                    <td>{item?.booking_id}</td>
                    <td>{item?.user?.email}</td>
                    <td>{formatDate(item?.created_at)}</td>
                    <td>{item?.created_by}</td>
                    <td>
                      <Status status={item?.status} />
                    </td>
                    <td>
                      <TableActionDropDown>
                        <>
                          <MenuItem>
                            <Link
                              to={`/bookings/booking-details/${item?.booking_id}`}
                              className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                            >
                              View Booking
                            </Link>
                          </MenuItem>
                          {invoice?.delete && (
                            <MenuItem>
                              <button
                                type="button"
                                onClick={() => selectForDelete(item?.id)}
                                className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                              >
                                Delete Invoice
                              </button>
                            </MenuItem>
                          )}
                          {/* {booking_email && (
                            <MenuItem>
                              <Link
                                to={`#`}
                                className=" p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                              >
                                Download Invoice
                              </Link>
                            </MenuItem>
                          )} */}
                          {booking_email?.create && (
                            <MenuItem>
                              <button
                                onClick={() => resendInvoice()}
                                className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                              >
                                Resend Via E-mail
                              </button>
                            </MenuItem>
                          )}
                        </>
                      </TableActionDropDown>
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
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="invoices"
        />
      </div>
      <DeleteConfirmation
        confirmationHandler={deleteInvoice}
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
