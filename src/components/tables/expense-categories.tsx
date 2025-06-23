import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeExpenseategory } from "../../stores/apiData/expense-categories";
import PlusIcon from "../../assets/icons/plus";
import LoadingButton from "../button";
import useGetExpenseCategories from "../../services-hooks/useGetExpenseCategories";
import AddEditExpensesCategories from "../../pages/reports/owners/expense-categories/add-edit-expense-category";
import PenIcon from "../../assets/icons/pen";
import BinIcon from "../../assets/icons/bin-icon";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import { requestCategories } from "../../types/apiData/request-categories";
import TableTemplate from "./table-template";

export default function ExpenseCategoriesistsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openEditExpenseCategory, setOpenEditExpenseCategory] = useState(false);

  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetExpenseCategories({
    page,
    sort,
    limit: size,
  });

  const openForCreate = useCallback(() => {
    setSelectedId("");
    setOpenEditExpenseCategory(true);
  }, []);

  const openForEdit = useCallback((id: string) => {
    setSelectedId(id);
    setOpenEditExpenseCategory(true);
  }, []);

  const openForDelete = useCallback((id: string) => {
    setSelectedId(id);
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/expense-category/${selectedId}`);
      dispatch(removeExpenseategory({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);
  const { data: owner_report } = useGetResourceAccessChecker({
    resource: "owner-report-entry",
  });

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 ">
        <div className="w-full flex justify-end">
          {owner_report?.create && (
            <div>
              <LoadingButton
                label="Add Expense Category"
                isLoading={false}
                type="button"
                clickHandler={() => openForCreate()}
                startIcon={<PlusIcon />}
              />
            </div>
          )}
        </div>
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Expense Categories</h2>
          <Sort id="expense-category" label="Sort List" />{" "}
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Name",
              key: "name",
              showColumnSort: true,
              render: (row: requestCategories) => <span>{row?.name}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: requestCategories) => (
                <div className=" flex items-center gap-4">
                  {owner_report?.update && (
                    <button
                      title="edit"
                      onClick={() => openForEdit(String(row?.id))}
                    >
                      <PenIcon />
                    </button>
                  )}
                  {owner_report?.delete && (
                    <button
                      title="delete"
                      onClick={() => openForDelete(String(row?.id))}
                    >
                      <BinIcon className=" size-6 text-red-500" />
                    </button>
                  )}
                </div>
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
        title="Delete Expense Category"
        description="Are you sure you want to delete this expense category?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openEditExpenseCategory}
        setOpen={setOpenEditExpenseCategory}
        showXicon={true}
        title="Edit Expense Category"
        className=" max-w-md"
      >
        <AddEditExpensesCategories
          setOpen={setOpenEditExpenseCategory}
          id={selectedId}
        />
      </ModalTemplate>
    </>
  );
}
