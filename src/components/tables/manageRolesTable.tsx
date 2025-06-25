import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAxios from "../../useHooks/useAxios";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useGetRoles from "../../services-hooks/useGetRoles";
import { removeRolesInList } from "../../stores/apiData/roles-lists";
// import MobileRolesTable from "./mobile/roles";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import { roles } from "../../types/apiData/roles";
import TableTemplate from "./table-template";
import paginatedPageSerializer from "../../utils/page-serializer";

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

  const [{ page, size, sort, search }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });
  const { data, isLoading, pagination } = useGetRoles({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort: sort,
    search,
    limit: size,
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
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "S/N",
              key: "sn",
              render: (row: roles, index) => (
                <span>
                  {paginatedPageSerializer({
                    currentPage: pagination?.current_page,
                    pageSize: pagination?.per_page,
                    index: index || 0,
                  })}
                </span>
              ),
            },
            {
              header: "Name",
              key: "name",
              showColumnSort: false,
              render: (row: roles) => <span>{row?.name}</span>,
            },
            {
              header: "Guard Name",
              key: "guard_name",
              showColumnSort: false,
              render: (row: roles) => <span>{row?.guard_name}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: roles) => (
                <TableActionDropDown>
                  <>
                    {role?.update && (
                      <MenuItem>
                        <Link
                          to={`/employees/roles/edit/${row?.id}`}
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
                          onClick={() => onDeleteClick(row?.id)}
                          className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete role
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
