import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import useGetAllAdditionalServiceLists from "../../services-hooks/useGetAllAdditionalServiceLists";
import Status from "../status";
import { useAppDispatch } from "../../stores/hooks";
import {
  markAdditionalServiceItemAsResolved,
  removeAdditionalServicesInList,
} from "../../stores/apiData/additional-services-lists";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import formatDate from "../../utils/isoDateConverter";
import TableSearch from "../inputs/search/table-search";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";

export default function AdditionalServiceListTable({
  header,
}: {
  header: string[];
}) {
  const dispatch = useAppDispatch();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });

  const [confirming, setConfirming] = useState(false);
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllAdditionalServiceLists({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
    });

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("1");

  const deleteAdditionalServices = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removeAdditionalServicesInList({ id: deleteId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [deleteId]);

  const markedAsResolved = useCallback(async (id: number) => {
    setConfirming(true);
    try {
      const response = await axios.put(
        `/admin/additional-service/mark-resolved/${id}`
      );
      const result = response?.data?.data;
      // console.log({ response });
      dispatch(markAdditionalServiceItemAsResolved(result));
      dispatch(
        openSnackbar({
          message: "Succefully marked as resolved",
          isError: false,
        })
      );
    } catch (error) {
    } finally {
      setConfirming(false);
    }
  }, []);

  // const deleteModal = useCallback((id: number) => {
  //   setDeleteId(String(id));
  //   setOpenDeleteConfirmation(true);
  // }, []);

  const { data: additional_services } = useGetResourceAccessChecker({
    resource: "additional-service",
  });
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <div className=" max-w-md">
            <TableSearch
              setValue={setSearch}
              placeholder="Search service name, apartment name..."
            />
          </div>
          {/* <FilterSearch /> */}
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
                {data?.map((item) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td>
                        {item?.user?.first_name} {item?.user?.last_name}
                      </td>
                      <td>{item?.booking?.shortlet?.name}</td>
                      <td>{formatDate(item?.created_at)}</td>
                      <td>{item?.service_type?.name}</td>
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
                              <Link
                                to={`/additional-services/service-details/${item?.id}`}
                                className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                              >
                                View Details
                              </Link>
                            </MenuItem>
                            {additional_services?.update && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => markedAsResolved(item?.id)}
                                  className="text-left w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Mark As Resolved
                                </button>
                              </MenuItem>
                            )}
                            {/* {additional_services?.delete && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteModal(item?.id);
                                  }}
                                  className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Delete Service
                                </button>
                              </MenuItem>
                            )} */}
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
        {/* <div className="w-full block md:hidden">
          <MobileAdditionalServicesTable
            data={data}
            deleteFunction={deleteModal}
          />
        </div> */}
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="items"
        />
      </div>

      <DeleteConfirmation
        confirmationHandler={deleteAdditionalServices}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Service"
        description="Are you sure you want to delete this service"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
