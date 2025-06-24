import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeBuildingInList } from "../../stores/apiData/apartment/buildings";
import useGetBuildings from "../../services-hooks/apartment/useGetBuildings";
import AddEditBuildings from "../../pages/apartments/buildings/add-edit-buildings";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import { building } from "../../types/apiData/apartment/buildings";
import TableTemplate from "./table-template";

export default function BuildingsListsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetBuildings({
    page,
    sort,
    limit: size,
  });

  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/building/${selectedId}`);
      dispatch(removeBuildingInList({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: building } = useGetResourceAccessChecker({
    resource: "building",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Buildings</h2>
          <Sort id="room-options" label="Sort List" />{" "}
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Name",
              key: "name",
              showColumnSort: true,
              render: (row: building) => <span>{row?.name}</span>,
            },
            {
              header: "Address",
              key: "address",
              showColumnSort: true,
              render: (row: building) => <span>{row?.address}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: building) => (
                <TableActionDropDown>
                  <>
                    {building?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(row?.id));
                            setOpenEdit(true);
                          }}
                          className=" p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit
                        </button>
                      </MenuItem>
                    )}
                    {building?.delete && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(row?.id));
                            setOpenDelete(true);
                          }}
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
        title="Delete Building"
        description="Are you sure you want to delete this building?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openEdit}
        setOpen={setOpenEdit}
        showXicon={true}
        title="Edit Building"
        className=" max-w-md"
      >
        <AddEditBuildings setOpen={setOpenEdit} id={selectedId} />
      </ModalTemplate>
    </>
  );
}
