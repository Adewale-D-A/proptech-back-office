import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NoResult from "../noResult";
import useAxios from "../../useHooks/useAxios";
import { removeAdminsInList } from "../../stores/apiData/admins-list";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useGetAllAdmins from "../../services-hooks/useGetAllAdmins";
import Pagination from "../pagination";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";

export default function ManageAdminUsersTable() {
  const axios = useAxios();
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
    useGetAllAdmins({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
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

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Admins Lists</h2>
          <div className=" max-w-md">
            <TableSearch
              setValue={setSearch}
              placeholder="First name, last name, email, phone number..."
            />
          </div>
          <div className=" flex items-center gap-2">
            <Filter actionHandler={handleCustomersFiltering} />
            <Sort setSort={setSort} id="sort-by" label="Sort by" />
          </div>
        </div>
        {data?.length > 0 ? (
          <table className=" w-full py-10 border rounded-md">
            <thead>
              <tr className=" text-left bg-gray-200/15 text-gray-500">
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((request, index) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td className=" text-gray-500  max-w-xs">{index + 1}</td>
                    <td className=" max-w-xs">
                      {request?.first_name} {request?.last_name}
                    </td>
                    <td className=" max-w-xs">{request?.email}</td>
                    <td className=" max-w-xs">{request?.role}</td>
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <Link
                          to={`/admin/edit/${request?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit admin
                        </Link>
                        <button
                          type="button"
                          onClick={() => onDeleteClick(request?.id)}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete admin
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NoResult title="No Result" message="No data found for this page" />
        )}
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={false}
          label="admins"
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
