import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NoResult from "../noResult";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import Pagination from "../pagination";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useGetRoles from "../../services-hooks/useGetRoles";
import { removeRolesInList } from "../../stores/apiData/roles-lists";
// import MobileRolesTable from "./mobile/roles";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function ManageRoleTableData() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedId, setSelectedId] = useState(0);
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetRoles({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
    });

  // handle remove user from list
  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/admin/roles/${selectedId}`);
      dispatch(removeRolesInList({ id: selectedId }));
      dispatch(
        openSnackbar({
          message: "Role successfully deleted",
          isError: false,
        })
      );
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  // open delete modal and update delete index
  const onDeleteClick = useCallback((id: number) => {
    setOpenDelete(true);
    setSelectedId(id);
  }, []);

  const { data: role } = useGetResourceAccessChecker({
    resource: "role",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Roles List</h2>
          {/* <div className=" max-w-md">
            <TableSearch
              setValue={setSearch}
              placeholder="First name, last name, email, phone number..."
            />
          </div>
          <div className=" flex items-center gap-2">
            <Filter actionHandler={handleCustomersFiltering} />
            <Sort setSort={setSort} id="sort-by" label="Sort by" />
          </div> */}
        </div>
        {data?.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Guard Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((request, index) => {
                  return (
                    <tr key={request?.id} className=" border-b">
                      <td className=" text-gray-500  max-w-xs">{index + 1}</td>
                      <td className=" max-w-xs">{request?.name}</td>
                      <td className=" max-w-xs">{request?.guard_name}</td>
                      <td>
                        <TableActionDropDown>
                          <>
                            {role?.update && (
                              <MenuItem>
                                <Link
                                  to={`/employees/roles/edit/${request?.id}`}
                                  className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Edit role
                                </Link>
                              </MenuItem>
                            )}
                            {role?.delete && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => onDeleteClick(request?.id)}
                                  className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Delete role
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
          <NoResult title="No Result" message="No data found for this page" />
        )}
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="roles"
        />
      </div>

      <DeleteConfirmation
        confirmationHandler={handleDelete}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Role"
        description="Are you sure you want to delete this role"
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
}
