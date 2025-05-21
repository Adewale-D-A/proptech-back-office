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
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function RequestCategoriesistsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("asc");

  const { data, isLoading, pagination } = useGetRequestCategories({
    page: currentPage,
    sort,
  });

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

  const { data: maintenance_request_category } = useGetResourceAccessChecker({
    resource: "maintenance-request-category",
  });
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
          <div className=" min-w-40">
            <Sort setSort={setSort} id="sort-by" label="Sort by" />
          </div>
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
                      <td>
                        <TableActionDropDown>
                          <>
                            {maintenance_request_category?.update && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => openForEdit(String(item?.id))}
                                  className=" p-3 px-4 text-left w-full hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Edit
                                </button>
                              </MenuItem>
                            )}
                            {maintenance_request_category?.delete && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() =>
                                    openForDelete(String(item?.id))
                                  }
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
