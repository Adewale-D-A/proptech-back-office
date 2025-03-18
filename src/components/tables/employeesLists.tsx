import { useCallback, useState } from "react";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import NoResult from "../noResult";
import Pagination from "../pagination";
import ExportSelect from "../inputs/select/exportSelect";
import Select from "../inputs/select";
import PenIcon from "../../assets/icons/pen";
import BinIcon from "../../assets/icons/bin-icon";
import LoadingButton from "../button";
import PlusIcon from "../../assets/icons/plus";
import ModalTemplate from "../modal";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import EyeIcon from "../../assets/icons/eye";
import { Link } from "react-router-dom";
import AddEditEmployee from "../../pages/employees/add-edit-employee";
import useGetAllAdmins from "../../services-hooks/useGetAllAdmins";
import { removeAdminsInList } from "../../stores/apiData/admins-list";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import ExportToCSV from "../export-to-csv";
import { employeesExportFormater } from "../../utils/export-formerter-functions";

export default function EmployeesLists() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedId, setSelectedId] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllAdmins({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
    });

  const handleFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  const openForNewEmployee = useCallback(() => {
    setSelectedId("");
    setOpenEmployeeModal(true);
  }, []);

  const openForEdit = useCallback((id: number) => {
    setSelectedId(String(id || ""));
    setOpenEmployeeModal(true);
  }, []);

  const handleOpenDelete = useCallback((id: number) => {
    setSelectedId(String(id) || "");
    setOpenDelete(true);
  }, []);

  // handle remove user from list
  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/admin/admins/${selectedId}`);
      dispatch(removeAdminsInList({ id: selectedId }));
      dispatch(
        openSnackbar({
          message: "Employee successfully deleted",
          isError: false,
        })
      );
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
              value={category}
              setValue={setCategory}
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
              Employees list{" "}
              <span className=" bg-[#F9F5FF] rounded-full text-xs text-[#2A3F8F] px-2.5 py-1">
                {pagination?.total} total{" "}
              </span>
            </h2>{" "}
            <div className=" w-fit flex items-center gap-3">
              <ExportToCSV
                dataset={data}
                jsonToCSVReformerter={employeesExportFormater}
                fileName="employees-list"
              />

              <LoadingButton
                label="New employee"
                isLoading={false}
                type="button"
                clickHandler={() => openForNewEmployee()}
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          <div className="block">
            {data && data.length > 0 ? (
              <table className=" w-full overflow-x-auto">
                <thead className="">
                  <tr className=" text-left text-xs font-medium bg-[#F9FAFB] text-[#475467] rounded-lg">
                    {["Employee", "Role", "Action"].map((head) => (
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
                            src={item?.profile_photo || "/logo_blue.png"}
                            alt={item?.first_name}
                            className=" h-10 w-10 rounded aspect-square"
                          />
                          <span className=" flex flex-col gap-1">
                            <span className=" text-xs font-medium text-[#101828]">
                              {item?.first_name} {item?.last_name}
                            </span>
                            <span className=" text-xs text-[#475467] font-medium">
                              {item?.email}
                            </span>
                          </span>
                        </td>
                        <td className=" text-xs font-medium text-[#475467]  min-w-36">
                          {item?.role_id}
                        </td>
                        <td>
                          <div className=" flex items-center gap-4">
                            <Link to={`/employees/view-employee/${item?.id}`}>
                              <EyeIcon />
                            </Link>

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
        title="Delete employee"
        description="This employee’s data will be permanently deleted"
        btnTitle="Yes, confirm"
      />
      <ModalTemplate
        open={openEmployeeModal}
        setOpen={setOpenEmployeeModal}
        showXicon={true}
        title={selectedId ? "Edit" : "Add new employee"}
        className=" max-w-[800px] lg:ml-20"
      >
        <AddEditEmployee id={selectedId} setOpen={setOpenEmployeeModal} />
      </ModalTemplate>
    </>
  );
}
