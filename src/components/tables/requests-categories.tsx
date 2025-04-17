import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import NoResult from "../noResult";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import useGetRequestCategories from "../../services-hooks/useGetRequestCategories";
import AddEditRequestsCategories from "../../pages/requests/requests-categories/add-edit-request-category";
import { removeRequestCategory } from "../../stores/apiData/requests-categories";
import PlusIcon from "../../assets/icons/plus";
import LoadingButton from "../button";

export default function RequestCategoriesistsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetRequestCategories({ page: currentPage });

  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openEditRequestCategory, setOpenEditRequestCategory] = useState(false);

  const openForCreate = useCallback(() => {
    setSelectedId("");
    setOpenEditRequestCategory(true);
  }, []);

  const openForEdit = useCallback((id: string) => {
    setSelectedId(id);
    setOpenEditRequestCategory(true);
  }, []);

  const openForDelete = useCallback((id: string) => {
    setSelectedId(id);
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/maintenance-category/${selectedId}`);
      dispatch(removeRequestCategory({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className="w-full flex justify-end">
          <div>
            <LoadingButton
              label="Add Maintenance Category"
              isLoading={false}
              type="button"
              clickHandler={() => openForCreate()}
              startIcon={<PlusIcon />}
            />
          </div>
        </div>
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">
            Maintenance Requests Categories
          </h2>
          <Sort id="room-options" label="Sort List" />{" "}
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {["Amenities Name", "Action"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
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
          </div>
        ) : (
          <NoResult />
        )}
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="request category"
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Request Category"
        description="Are you sure you want to delete this request category?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openEditRequestCategory}
        setOpen={setOpenEditRequestCategory}
        showXicon={true}
        title="Edit Request Category"
        className=" max-w-md"
      >
        <AddEditRequestsCategories
          setOpen={setOpenEditRequestCategory}
          id={selectedId}
        />
      </ModalTemplate>
    </>
  );
}
