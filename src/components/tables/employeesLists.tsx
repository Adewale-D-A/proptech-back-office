import { useCallback, useState } from "react";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
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
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import useGetRoles from "../../services-hooks/useGetRoles";
import Sort from "../filterAndSort/sort";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import { admin } from "../../types/apiData/admins";
import TableTemplate from "./table-template";

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

  const [{ page, size, sort, search }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });
  const { data, isLoading, pagination } = useGetAllAdmins({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    search,
    category,
    limit: size,
  });

  const { data: roles } = useGetRoles({ limit: 1000 });
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

  const { data: admin } = useGetResourceAccessChecker({
    resource: "admin",
  });
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex items-center flex-col md:flex-row justify-between gap-3">
          <div className=" w-[320px]">
            <TableSearch placeholder="Search..." />
          </div>
          <div className=" flex items-center gap-3 flex-col md:flex-row">
            <Select
              isRequired={true}
              value={category}
              setValue={setCategory}
              id="categories-filtering"
            >
              <option value="">All categories</option>
              {roles?.map((item) => (
                <option key={item?.id} value={String(item?.id || "")}>
                  {item?.name}
                </option>
              ))}
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
            <div className=" w-fit flex items-center flex-col md:flex-row gap-3">
              <ExportToCSV
                dataset={data}
                jsonToCSVReformerter={employeesExportFormater}
                fileName="employees-list"
              />
              <div className="w-fit min-w-28">
                <Sort id="employee-sort" label="" defaultValue="desc" />
              </div>
              {admin?.create && (
                <LoadingButton
                  label="New employee"
                  isLoading={false}
                  type="button"
                  clickHandler={() => openForNewEmployee()}
                  startIcon={<PlusIcon />}
                />
              )}
            </div>
          </div>
          <TableTemplate
            data={data}
            isLoading={isLoading}
            columns={[
              {
                header: "Employee",
                key: "employee",
                showColumnSort: false,
                render: (row: admin) => (
                  <div className=" flex gap-2 items-center min-w-36">
                    <img
                      src={row?.profile_photo || "/logo_blue.png"}
                      alt={row?.first_name}
                      className=" h-10 w-10 rounded aspect-square"
                    />
                    <span className=" flex flex-col gap-1">
                      <span className=" text-xs font-medium text-[#101828]">
                        {row?.first_name} {row?.last_name}
                      </span>
                      <span className=" text-xs text-[#475467] font-medium">
                        {row?.email}
                      </span>
                    </span>
                  </div>
                ),
              },
              {
                header: "Role",
                key: "role",
                showColumnSort: false,
                render: (row: admin) => <span>{row?.role?.name}</span>,
              },
              {
                header: "Action",
                key: "action",
                render: (row: admin) => (
                  <div className=" flex items-center gap-4">
                    <Link to={`/employees/view-employee/${row?.id}`}>
                      <EyeIcon />
                    </Link>

                    {admin?.update && (
                      <button title="edit" onClick={() => openForEdit(row?.id)}>
                        <PenIcon />
                      </button>
                    )}
                    {admin?.delete && (
                      <button
                        title="delete"
                        onClick={() => handleOpenDelete(row?.id)}
                      >
                        <BinIcon className=" size-6 text-red-500" />
                      </button>
                    )}
                  </div>
                ),
              },
            ]}
            showPaginator={true}
            pagination={pagination}
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
        // className=" max-w-[800px] lg:ml-20"
      >
        <AddEditEmployee id={selectedId} setOpen={setOpenEmployeeModal} />
      </ModalTemplate>
    </>
  );
}
