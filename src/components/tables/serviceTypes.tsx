import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import useGetServiceTypes from "../../services-hooks/useGetServiceTypes";
import Filter from "../filterAndSort/filter";
import TableSearch from "../inputs/search/table-search";
import AddEditServiceType from "../service-type/add-edit";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeServiceTypeInList } from "../../stores/apiData/service-types";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function ServiceTypeTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetServiceTypes({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
    });
  const [selectedId, setSelectedId] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSalesFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

  const handleOpeEdit = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenEdit(true);
  }, []);

  const handleOpenDelete = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/service-type/${selectedId}`);
      dispatch(removeServiceTypeInList({ id: selectedId }));
      dispatch(
        openSnackbar({
          message: "Service type successfully deleted",
          isError: false,
        })
      );
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: service_type } = useGetResourceAccessChecker({
    resource: "service-type",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Service Types</h2>
          <div>
            <TableSearch
              setValue={setSearch}
              placeholder="First name, last name, email, phone number..."
            />
          </div>
          <div className=" flex items-center gap-3 text-sm text-gray-500 flex-col md:flex-row">
            <Filter actionHandler={handleSalesFiltering} />
            <Sort setSort={setSort} id={"service-types"} label={"Sort by:"} />
          </div>
        </div>
        <div className=" w-full overflow-x-auto">
          <table className=" w-full">
            <thead>
              <tr>
                {["Name", "Price", "Description", "Action"].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item?.id} className=" border-b">
                    <td>{item?.name}</td>
                    <td>
                      {item?.currency} {item?.price}
                    </td>
                    <td>{item?.description}</td>
                    <td>
                      <TableActionDropDown>
                        <>
                          {service_type?.update && (
                            <MenuItem>
                              <button
                                type="button"
                                onClick={() => handleOpeEdit(item?.id)}
                                className=" p-3 px-4 text-left w-full hover:bg-primary/10 transition-all rounded-lg"
                              >
                                Edit
                              </button>
                            </MenuItem>
                          )}
                          {service_type?.update && (
                            <MenuItem>
                              <button
                                type="button"
                                onClick={() => handleOpenDelete(item?.id)}
                                className="p-3 px-4 text-left w-full hover:bg-primary/10 transition-all rounded-lg"
                              >
                                Delete
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
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="service types"
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Service Type"
        description="Are you sure you want to delete this service type?"
        btnTitle="Yes, I want to"
      />

      <ModalTemplate
        open={openEdit}
        setOpen={setOpenEdit}
        showXicon={true}
        title="Edit Service Type"
        className=" max-w-md"
      >
        <AddEditServiceType setOpen={setOpenEdit} id={selectedId} />
      </ModalTemplate>
    </>
  );
}
