import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import NoResult from "../noResult";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeBuildingInList } from "../../stores/apiData/apartment/buildings";
import useGetBuildings from "../../services-hooks/apartment/useGetBuildings";
import AddEditBuildings from "../../pages/apartments/buildings/add-edit-buildings";

export default function BuildingsListsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetBuildings({ page: currentPage });

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

  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Buildings</h2>
          <Sort id="room-options" label="Sort List" />{" "}
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {["Name", "Address", "Action"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((request, index) => {
                  return (
                    <tr key={request?.id} className=" border-b">
                      <td>{request?.name}</td>
                      <td>{request?.address}</td>
                      <td className=" group relative">
                        <span className=" p-2 bg-primary/15 rounded-lg">
                          ...
                        </span>
                        <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedId(String(request?.id));
                              setOpenEdit(true);
                            }}
                            className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedId(String(request?.id));
                              setOpenDelete(true);
                            }}
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
          label="buildings"
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
