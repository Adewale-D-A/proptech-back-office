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
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { serviceType } from "../../types/apiData/serviceTypes";

export default function ServiceTypeTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
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
  const { data, isLoading, pagination } = useGetServiceTypes({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    search,
    limit: size,
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
            <TableSearch placeholder="First name, last name, email, phone number..." />
          </div>
          <div className=" flex items-center gap-3 text-sm text-gray-500 flex-col md:flex-row">
            <Filter actionHandler={handleSalesFiltering} />
            <Sort id={"service-types"} label={"Sort by:"} />
          </div>
        </div>

        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Name",
              key: "name",
              showColumnSort: false,
              render: (row: serviceType) => <span>{row?.name}</span>,
            },
            {
              header: "Price",
              key: "price",
              showColumnSort: false,
              render: (row: serviceType) => (
                <span>
                  {" "}
                  {row?.currency} {row?.price}
                </span>
              ),
            },
            {
              header: "Description",
              key: "description",
              showColumnSort: false,
              render: (row: serviceType) => <span>{row?.description}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: serviceType) => (
                <TableActionDropDown>
                  <>
                    {service_type?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => handleOpeEdit(row?.id)}
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
                          onClick={() => handleOpenDelete(row?.id)}
                          className="p-3 px-4 text-left w-full hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete
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
