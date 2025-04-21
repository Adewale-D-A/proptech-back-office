import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import NoResult from "../noResult";
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

export default function ExpenseCategoriesistsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const [sort, setSort] = useState("asc");
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openEditExpenseCategory, setOpenEditExpenseCategory] = useState(false);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetExpenseCategories({ page: currentPage, sort });

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
          <Sort
            setSort={setSort}
            id="expense-category"
            label="Sort List"
          />{" "}
        </div>
        {data && data.length > 0 ? (
          <table className=" w-full overflow-x-auto">
            <thead className="">
              <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                {["Name", "Action"].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {data.map((item, index) => {
                return (
                  <tr key={item?.id} className=" border-b">
                    <td>{item?.name}</td>
                    <td>
                      <div className=" flex items-center gap-4">
                        {owner_report?.update && (
                          <button
                            title="edit"
                            onClick={() => openForEdit(String(item?.id))}
                          >
                            <PenIcon />
                          </button>
                        )}
                        {owner_report?.delete && (
                          <button
                            title="delete"
                            onClick={() => openForDelete(String(item?.id))}
                          >
                            <BinIcon className=" size-6 text-red-500" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NoResult />
        )}
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="expense category"
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
