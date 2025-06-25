import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import Status from "../status";
import { useAppDispatch } from "../../stores/hooks";
import ModalTemplate from "../modal";
import useGetAllRequestLists from "../../services-hooks/useGetAllRequestLists";
import { removeRequestsInList } from "../../stores/apiData/requests-lists";
import formatDate, { formatTime } from "../../utils/isoDateConverter";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useAxios from "../../useHooks/useAxios";
import RequestStatusUpdate from "../booking-detail/request-status-update";
import { requests } from "../../types/apiData/requests";
import ExportToCSV from "../export-to-csv";
import { requestsExportFormater } from "../../utils/export-formerter-functions";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";

export default function RequestsListTable({ header }: { header: string[] }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const [openUpdateRequestStatus, setOpenUpdateRequestStatus] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [{ page, size, sort, search }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });
  //fetch request data
  const { data, isLoading, pagination } = useGetAllRequestLists({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    search,
    limit: size,
  });

  // update filtering options
  const handleCustomersFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

  // delete request
  const deleteRequest = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/user/request/${selectedId}`);
      dispatch(removeRequestsInList({ id: selectedId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  // mark as resolved option
  const markAsResolved = useCallback(async (request: requests) => {
    setSelectedId(String(request?.id));
    setOpenUpdateRequestStatus(true);
    setSelectedStatus(request?.status);
  }, []);

  const { data: user_request } = useGetResourceAccessChecker({
    resource: "user-request",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 overflow-auto">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <div>
            <TableSearch placeholder="Apartment name, type, location..." />
          </div>
          <div className=" flex items-center gap-2 flex-col md:flex-row">
            <Filter actionHandler={handleCustomersFiltering} />
            <Sort id="sort-by" label="Sort by" defaultValue="desc" />
            <ExportToCSV
              dataset={data}
              jsonToCSVReformerter={requestsExportFormater}
              fileName="requests-list"
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
              render: (row: requests) => (
                <span>
                  {row?.user?.first_name} {row?.user?.last_name}
                </span>
              ),
            },
            {
              header: "Apartment Name",
              key: "apartment_name",
              showColumnSort: false,
              render: (row: requests) => <span>{row?.shortlet?.name}</span>,
            },
            {
              header: "Date of Request",
              key: "date_of_request",
              showColumnSort: false,
              render: (row: requests) => (
                <span>
                  {formatDate(row?.created_at)} {formatTime(row?.created_at)}
                </span>
              ),
            },

            {
              header: "Request Type",
              key: "request_type",
              showColumnSort: false,
              render: (row: requests) => <span>{row?.subject}</span>,
            },
            {
              header: "Description",
              showColumnSort: false,
              key: "description",
              render: (row: requests) => <span>{row?.description}</span>,
            },
            {
              header: "Escalated Status",
              key: "escalated_status",
              showColumnSort: false,
              render: (row: requests) => (
                <Status
                  status="additional-service-escalte"
                  booleanVal={Boolean(row?.is_escalated)}
                  falsyMessage="Not Escalated"
                  truthyMessage="Escalated"
                />
              ),
            },
            {
              header: "Status",
              key: "status",
              showColumnSort: false,
              render: (row: requests) => <Status status={row?.status} />,
            },
            {
              header: "Action",
              key: "action",
              render: (row: requests) => (
                <TableActionDropDown>
                  <>
                    <MenuItem>
                      <Link
                        to={`/bookings/request-details/${row?.id}`}
                        className="w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Details
                      </Link>
                    </MenuItem>
                    {user_request?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            markAsResolved(row);
                          }}
                          className="w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Mark As Resolved
                        </button>
                      </MenuItem>
                    )}
                    {user_request?.delete && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(row?.id));
                            setOpenDeleteConfirmation(true);
                          }}
                          className="w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Request
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
        confirmationHandler={deleteRequest}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Booking"
        description="Are you sure you want to delete this request"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />

      <ModalTemplate
        open={openUpdateRequestStatus}
        setOpen={setOpenUpdateRequestStatus}
        showXicon={true}
        title="Update Request Status"
        className=" max-w-md"
      >
        <RequestStatusUpdate
          id={selectedId}
          setValue={setOpenUpdateRequestStatus}
          currentStatus={selectedStatus}
        />
      </ModalTemplate>
    </>
  );
}
