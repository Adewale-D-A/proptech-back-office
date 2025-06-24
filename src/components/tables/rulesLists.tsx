import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import AddEdit from "../amenities/addEdit";
import useGetHouseRules from "../../services-hooks/useGetAllRules";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeHouseRule } from "../../stores/apiData/house-rules";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { houseRule } from "../../types/apiData/houseRules";

export default function RulesLists() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetHouseRules({
    page,
    limit: size,
    sort,
  });
  const [selectedId, setSelectedId] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [editRule, setEditRule] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/rule/${selectedId}`);
      dispatch(removeHouseRule({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: rule } = useGetResourceAccessChecker({
    resource: "rule",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Rules Lists</h2>
          <Sort id="extra-options" label="Sort List" />{" "}
        </div>

        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Category Name",
              key: "category",
              showColumnSort: true,
              render: (row: houseRule) => <span>{row?.name}</span>,
            },
            {
              header: "Description",
              key: "description",
              showColumnSort: true,
              render: (row: houseRule) => <span>{row?.description}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: houseRule) => (
                <TableActionDropDown>
                  <>
                    {rule?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(row?.id));
                            setEditRule(true);
                          }}
                          className=" p-3 px-4 text-left w-full hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit
                        </button>
                      </MenuItem>
                    )}{" "}
                    {rule?.delete && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(row?.id));
                            setOpenDelete(true);
                          }}
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
        title="Delete Rule"
        description="Are you sure you want to delete this rule?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={editRule}
        setOpen={setEditRule}
        showXicon={true}
        title="Edit"
        className=" max-w-md"
      >
        <AddEdit setOpen={setEditRule} id={selectedId} componentId="rule" />
      </ModalTemplate>
    </>
  );
}
