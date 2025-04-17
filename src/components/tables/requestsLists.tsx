import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
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

export default function RequestsListTable({ header }: { header: string[] }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [sort, setSort] = useState("desc");

  const [openUpdateRequestStatus, setOpenUpdateRequestStatus] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");
  const [selectedStatus, setSelectedStatus] = useState("");

  //fetch request data
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllRequestLists({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
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
            <TableSearch
              setValue={setSearch}
              placeholder="Apartment name, type, location..."
            />
          </div>
          <div className=" flex items-center gap-2 flex-col md:flex-row">
            <Filter actionHandler={handleCustomersFiltering} />
            <Sort setSort={setSort} id="sort-by" label="Sort by" />
            <ExportToCSV
              dataset={data}
              jsonToCSVReformerter={requestsExportFormater}
              fileName="requests-list"
            />
          </div>
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
                        {item?.user?.first_name} {item?.user?.last_name}
                      </td>
                      <td>{item?.shortlet?.name}</td>
                      <td>
                        {formatDate(item?.created_at)}{" "}
                        {formatTime(item?.created_at)}
                      </td>
                      <td>{item?.subject}</td>
                      <td>{item?.description}</td>
                      <td>
                        <Status
                          status="additional-service-escalte"
                          booleanVal={Boolean(item?.is_escalated)}
                          falsyMessage="Not Escalated"
                          truthyMessage="Escalated"
                        />
                      </td>
                      <td>
                        <Status status={item?.status} />
                      </td>
                      <td>
                        <TableActionDropDown>
                          <>
                            <MenuItem>
                              {" "}
                              <Link
                                to={`/bookings/request-details/${item?.id}`}
                                className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                              >
                                View Details
                              </Link>
                            </MenuItem>
                            {user_request?.update && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => {
                                    markAsResolved(item);
                                  }}
                                  className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
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
                                    setSelectedId(String(item?.id));
                                    setOpenDeleteConfirmation(true);
                                  }}
                                  className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Delete Request
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
          </div>
        ) : (
          <NoResult />
        )}
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="requests"
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
