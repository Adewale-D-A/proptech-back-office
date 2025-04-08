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

export default function ExpenseCategoriesistsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetExpenseCategories({ page: currentPage });

  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openEditExpenseCategory, setOpenEditExpenseCategory] = useState(false);

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
    setOpenEditExpenseCategory(true);
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

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 ">
        <div className="w-full flex justify-end">
          <div>
            <LoadingButton
              label="Add Expense Category"
              isLoading={false}
              type="button"
              clickHandler={() => openForCreate()}
              startIcon={<PlusIcon />}
            />
          </div>
        </div>
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Expense Categories</h2>
          <Sort id="room-options" label="Sort List" />{" "}
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
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <button
                          type="button"
                          onClick={() => openForEdit(String(item?.id))}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => openForDelete(String(item?.id))}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete
                        </button>
                      </span>
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
        title="Delete Request Category"
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
