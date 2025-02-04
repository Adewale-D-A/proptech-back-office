import { useCallback, useState } from "react";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import NoResult from "../noResult";
import Pagination from "../pagination";
import formatDate from "../../utils/isoDateConverter";
import ExportSelect from "../inputs/select/exportSelect";
import Select from "../inputs/select";
import useGetRequisitionRequests from "../../services-hooks/useGetRequisitionRequests";
import Status from "../status";
import DoubleCheckIcon from "../../assets/icons/double-check";
import PenIcon from "../../assets/icons/pen";
import BinIcon from "../../assets/icons/bin-icon";
import LoadingButton from "../button";
import PlusIcon from "../../assets/icons/plus";
import ModalTemplate from "../modal";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeRequisitionRequestInList } from "../../stores/apiData/requisition-requests";
import EyeIcon from "../../assets/icons/eye";
import EditEmployee from "../employees/edit-employee";
import AddEmployee from "../employees/add-employee";
import { Link } from "react-router-dom";

export default function MaintenanceRequestTable() {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();

  const [filterOption, setFilterOption] = useState("");
  const [search, setSearch] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState("");
  const [openMaintenanceRequestEdit, setOpenMaintenanceRequestEdit] =
    useState(false);
  const [openNewMaintenanceRequest, setOpenNewMaintenanceRequest] =
    useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetRequisitionRequests({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      search,
    });
  const handleFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  const openForNewMaintenanceRequest = useCallback(() => {
    setSelectedId("");
    setOpenNewMaintenanceRequest(true);
  }, []);

  const openForEditMaintenanceRequest = useCallback((id: number) => {
    setSelectedId(String(id || ""));
    setOpenMaintenanceRequestEdit(true);
  }, []);

  const handleOpenDelete = useCallback((id: number) => {
    setSelectedId(String(id) || "");
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      // await axios.delete(`/admin/extra-option/${selectedId}`);
      dispatch(removeRequisitionRequestInList({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex items-center flex-col md:flex-row justify-between gap-3">
          <div className=" w-[320px]">
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
          <div className=" flex items-center gap-3 flex-col md:flex-row">
            <Select
              isRequired={true}
              value={filterOption}
              setValue={setFilterOption}
              id="categories-filtering"
            >
              <option value="" disabled>
                All categories
              </option>
            </Select>
            <Filter actionHandler={handleFiltering} />
          </div>
        </div>
        <div className="w-full rounded-lg border  flex flex-col gap-5">
          <div className=" w-full justify-between p-5 gap-6 flex items-center flex-col lg:flex-row">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Maintenance Requests{" "}
              <span className=" bg-[#F9F5FF] rounded-full text-xs text-[#2A3F8F] px-2.5 py-1">
                12 new requests
              </span>
            </h2>{" "}
            <div className=" w-fit flex items-center gap-3">
              <ExportSelect id="maintenance-requests" />

              <LoadingButton
                label="New request"
                isLoading={false}
                type="button"
                clickHandler={() => openForNewMaintenanceRequest()}
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          <div className="block">
            {data && data.length > 0 ? (
              <table className=" w-full overflow-x-auto">
                <thead className="">
                  <tr className=" text-left text-xs font-medium bg-[#F9FAFB] text-[#475467] rounded-lg">
                    {[
                      "Requesting employee",
                      "Apartment",
                      "Category",
                      "Request date",
                      "Status",
                      "Action",
                    ].map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {data.map((item) => {
                    return (
                      <tr key={item?.id} className=" border-b">
                        <td className=" flex gap-2 items-center min-w-36">
                          <img
                            src={item?.user?.profile_photo || "/logo_blue.png"}
                            alt={item?.user?.first_name}
                            className=" h-10 w-10 rounded aspect-square"
                          />
                          <span className=" flex flex-col gap-1">
                            <span className=" text-xs font-medium text-[#101828]">
                              Chuks
                            </span>
                            <span className=" text-xs text-[#475467] font-medium">
                              Operations
                            </span>
                          </span>
                        </td>
                        <td className=" text-xs font-medium text-[#475467]  min-w-36">
                          Victoria heights
                        </td>
                        <td className="text-xs font-medium text-[#475467] ">
                          HVAC
                        </td>

                        <td className="text-xs font-medium text-[#475467] ">
                          15th Sep, 2024
                        </td>
                        <td className="">
                          <Status status={item?.status} />
                        </td>
                        <td>
                          <div className=" flex items-center gap-4">
                            <Link
                              to={`/requests/maintenance-requests/view-maintenance/${item?.id}`}
                            >
                              {" "}
                              <button title="view employee">
                                <EyeIcon />
                              </button>
                            </Link>

                            <button
                              title="edit"
                              onClick={() =>
                                openForEditMaintenanceRequest(item?.id)
                              }
                            >
                              <PenIcon />
                            </button>
                            <button
                              title="delete"
                              onClick={() => handleOpenDelete(item?.id)}
                            >
                              <BinIcon className=" size-6 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <NoResult />
            )}
          </div>
          <Pagination
            pagination={pagination}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            label="Maintenance requests"
          />
        </div>
      </div>

      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete request"
        description="This request will be permanently deleted"
        btnTitle="Yes, confirm"
      />
      <ModalTemplate
        open={openNewMaintenanceRequest}
        setOpen={setOpenNewMaintenanceRequest}
        showXicon={true}
        title="New maintenance request"
        className=" max-w-screen-md "
      >
        <AddEmployee id={selectedId} setOpen={setOpenNewMaintenanceRequest} />
      </ModalTemplate>
      <ModalTemplate
        open={openMaintenanceRequestEdit}
        setOpen={setOpenMaintenanceRequestEdit}
        showXicon={true}
        title="Edit maintenance request"
        className=" max-w-screen-md "
      >
        <EditEmployee id={selectedId} setOpen={setOpenMaintenanceRequestEdit} />
      </ModalTemplate>
    </>
  );
}
