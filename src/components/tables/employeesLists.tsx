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
import AddEditRequisitionRequest from "../requisition-requests/add-edit";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeRequisitionRequestInList } from "../../stores/apiData/requisition-requests";
import EyeIcon from "../../assets/icons/eye";

export default function EmployeesLists() {
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
  const [openRequest, setOpenRequest] = useState(false);
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
  const openForNewRequest = useCallback(() => {
    setSelectedId("");
    setOpenRequest(true);
  }, []);

  const openForEdit = useCallback((id: number) => {
    setSelectedId(String(id || ""));
    setOpenRequest(true);
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
          <div className=" max-w-md">
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
            <h2 className="text-xl font-semibold">
              Employees list{" "}
              <span className="ml-1 bg-[#F9F5FF] rounded-full text-xs text-[#2A3F8F] px-2.5 py-1">
                18 total{" "}
              </span>
            </h2>{" "}
            <div className=" w-fit flex items-center gap-3">
              <ExportSelect id="employees" />

              <LoadingButton
                label="New employee"
                isLoading={false}
                type="button"
                clickHandler={() => openForNewRequest()}
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          <div className="block">
            {data && data.length > 0 ? (
              <table className=" w-full overflow-x-auto">
                <thead className="">
                  <tr className=" text-left bg-[#F9FAFB] text-[#475467] rounded-lg">
                    {[
                      "Employee",
                      "Department",
                      "Role",
                      "Shift",
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
                            <span>Chukuemeka</span>
                            <span className=" text-xs text-gray-500 flex items-center gap-1">
                              Chukwuemeka@gmail.com
                            </span>
                          </span>
                        </td>
                        <td className=" text-lg  min-w-36">Marketing</td>
                        <td>Digital Marketer</td>
                        <td>
                          {" "}
                          <span className=" flex flex-col gap-1">
                            <span>Mon - Fri</span>
                            <span className=" text-xs text-gray-500 flex items-center gap-1">
                              9:00AM - 5:00PM
                            </span>
                          </span>
                        </td>

                        <td>
                          <Status status={item?.status} />
                        </td>
                        <td>
                          <div className=" flex items-center gap-4">
                            <button title="mark as paid">
                              <EyeIcon />
                            </button>
                            <button
                              title="edit"
                              onClick={() => openForEdit(item?.id)}
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
            label="Employee list"
          />
        </div>
      </div>

      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Requisition Request"
        description="Are you sure you want to delete this requisition request?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openRequest}
        setOpen={setOpenRequest}
        showXicon={true}
        title="Requisition"
        className=" max-w-screen-md"
      >
        <AddEditRequisitionRequest id={selectedId} setOpen={setOpenRequest} />
      </ModalTemplate>
    </>
  );
}
