import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAxios from "../../useHooks/useAxios";
import { removeAdminsInList } from "../../stores/apiData/admins-list";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useGetAllAdmins from "../../services-hooks/useGetAllAdmins";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import { admin } from "../../types/apiData/admins";
import TableTemplate from "./table-template";
import paginatedPageSerializer from "../../utils/page-serializer";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";

export default function ManageAdminUsersTable() {
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

  const { data, isLoading, pagination } = useGetAllAdmins({
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

  // handle remove user from list
  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/admin/admins/${selectedId}`);
      dispatch(removeAdminsInList({ id: selectedId }));
      dispatch(
        openSnackbar({
          message: "Admin successfully deleted",
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

  const { data: admin } = useGetResourceAccessChecker({
    resource: "admin",
  });
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Admins Lists</h2>
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
              render: (row: admin, index) => (
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
              showColumnSort: true,
              render: (row: admin) => (
                <span>
                  {row?.first_name} {row?.last_name}
                </span>
              ),
            },
            {
              header: "Email",
              key: "email",
              render: (row: admin) => <span>{row?.email}</span>,
            },

            {
              header: "Role",
              key: "role",
              showColumnSort: true,
              render: (row: admin) => <span>{row?.role_id}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: admin) => (
                <TableActionDropDown>
                  <>
                    {admin?.update && (
                      <MenuItem>
                        <Link
                          to={`/admin/edit/${row?.id}`}
                          className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit admin
                        </Link>
                      </MenuItem>
                    )}
                    {admin?.delete && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => onDeleteClick(row?.id)}
                          className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete admin
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
        title="Delete Admin"
        description="Are you sure you want to delete this admin"
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
}
