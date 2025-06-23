import { useCallback, useState } from "react";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import useGetLocationGroupings from "../../services-hooks/apartment/useGetLocationGroupings";
import TableSearch from "../inputs/search/table-search";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeLocationGroupingInList } from "../../stores/apiData/apartment/location-groupings";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import AddEditLocationGroup from "../apartment/add-edit-location-group";
import paginatedPageSerializer from "../../utils/page-serializer";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import { locationGrouping } from "../../types/apiData/apartment/locationGroupings";
import TableTemplate from "./table-template";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";

export default function LocationGroupTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [{ page, size, sort, search }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });
  const { data, isLoading, pagination } = useGetLocationGroupings({
    page,
    search,
    sort,
    limit: size,
  });

  const [selectedId, setSelectedId] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      await axios.delete(`/admin/location-group/${selectedId}`);
      dispatch(removeLocationGroupingInList({ id: Number(selectedId) }));
      dispatch(
        openSnackbar({
          message: "Location group successfully deleted",
          isError: false,
        })
      );
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: location_group } = useGetResourceAccessChecker({
    resource: "location-group",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Location Groupings</h2>
          <div className=" max-w-md">
            <TableSearch placeholder="Search..." />
          </div>
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "S/N",
              key: "sn",
              render: (row: locationGrouping, index) => (
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
              render: (row: locationGrouping) => <span>{row?.name}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: locationGrouping) => (
                <TableActionDropDown>
                  <>
                    {location_group?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => handleOpeEdit(row?.id)}
                          className=" p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit
                        </button>
                      </MenuItem>
                    )}
                    {location_group?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(row?.id)}
                          className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
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
        title="Delete Location Grouping"
        description="Are you sure you want to delete this location grouping?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openEdit}
        setOpen={setOpenEdit}
        showXicon={true}
        title="Edit Location Group"
        className=" max-w-md"
      >
        <AddEditLocationGroup setOpen={setOpenEdit} id={selectedId} />
      </ModalTemplate>
    </>
  );
}
