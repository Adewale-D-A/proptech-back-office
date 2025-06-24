import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import useGetBlockedReasons from "../../services-hooks/useGetBlockedReasons";
import AddEditBlockedDatesReason from "../../pages/apartments/block-dates-reason/add-edit-blocked-dates";
import { removeBlockedDatesReason } from "../../stores/apiData/blocked-dates-reason";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { blockedReason } from "../../types/apiData/blocked-reason";

export default function BlockedDatesReasonsListsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetBlockedReasons({
    page,
    sort,
    limit: size,
  });

  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openEditBlockedDateReason, setOpenEditBlockedDateReason] =
    useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/block-date-reason/${selectedId}`);
      dispatch(removeBlockedDatesReason({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: blocked_dates_reasons } = useGetResourceAccessChecker({
    resource: "blocked-date-reason",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Blocked Date Reasons</h2>
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
              render: (row: blockedReason) => <span>{row?.name}</span>,
            },
            {
              header: "Description",
              key: "description",
              showColumnSort: true,
              render: (row: blockedReason) => <span>{row?.description}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: blockedReason) => (
                <TableActionDropDown>
                  <>
                    {blocked_dates_reasons?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(row?.id));
                            setOpenEditBlockedDateReason(true);
                          }}
                          className=" p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit
                        </button>
                      </MenuItem>
                    )}
                    {blocked_dates_reasons?.delete && (
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
        title="Delete Blocked Date Reason"
        description="Are you sure you want to delete this blocked date reason?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openEditBlockedDateReason}
        setOpen={setOpenEditBlockedDateReason}
        showXicon={true}
        title="Edit Blocked Date reason"
        className=" max-w-md"
      >
        <AddEditBlockedDatesReason
          setOpen={setOpenEditBlockedDateReason}
          id={selectedId}
        />
      </ModalTemplate>
    </>
  );
}
