import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
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
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import { invoice } from "../../types/apiData/invoice";
import TableTemplate from "./table-template";

export default function InvoiceListsTable({ header }: { header: string[] }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [{ search, page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });
  const { data, isLoading, pagination } = useGetApartmentInvoiceLists({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    search,
    limit: size,
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
            <TableSearch placeholder="Search..." />
          </div>
          <div className=" flex items-center gap-2 flex-col md:flex-row">
            <Filter actionHandler={handleCustomersFiltering} />
            <Sort id="sort-by" label="Sort by" />
            <ExportToCSV
              dataset={data}
              jsonToCSVReformerter={apartmentInvoiceExportFormater}
              fileName="apartment-invoice-list"
            />
          </div>
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Invoice Number",
              key: "invoice_number",
              showColumnSort: false,
              render: (row: invoice) => <span>{row?.invoice_number}</span>,
            },
            {
              header: "Booking ID",
              key: "booking_id",
              showColumnSort: false,
              render: (row: invoice) => (
                <Link
                  to={`/bookings/booking-details/edit-reservation/${row?.id}`}
                  className=" rounded-full p-2 border border-primary"
                >
                  {row?.booking_id}
                </Link>
              ),
            },
            {
              header: "Emailed To",
              key: "email_to",
              showColumnSort: false,
              render: (row: invoice) => <span>{row?.user?.email}</span>,
            },
            {
              header: "Created On",
              key: "created_on",
              showColumnSort: false,
              render: (row: invoice) => (
                <span>{formatDate(row?.created_at)}</span>
              ),
            },
            {
              header: "Created By",
              key: "created_by",
              showColumnSort: false,
              render: (row: invoice) => <span>{row?.created_by}</span>,
            },
            {
              header: "Status",
              key: "status",
              showColumnSort: false,
              render: (row: invoice) => <Status status={row?.status} />,
            },
            {
              header: "Action",
              key: "action",
              render: (row: invoice) => (
                <TableActionDropDown>
                  <>
                    <MenuItem>
                      <Link
                        to={`/bookings/booking-details/${row?.booking_id}`}
                        className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Booking
                      </Link>
                    </MenuItem>
                    {invoice?.delete && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => selectForDelete(row?.id)}
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
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
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
