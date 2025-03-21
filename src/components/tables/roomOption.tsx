import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import AddEditRoomOption from "../room-extra-options/add-edit-options";
import useGetRoomOptions from "../../services-hooks/useGetRoomOptions";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeRoomOption } from "../../stores/apiData/room-options";
import NoResult from "../noResult";

export default function RoomOptionTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetRoomOptions({ page: currentPage });
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [editRoomOption, setEditRoomOption] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/room-option/${selectedId}`);
      dispatch(removeRoomOption({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 overflow-x-auto">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Room Options List</h2>
          <Sort id="room-options" label="Sort Category" />{" "}
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {["Category Name", "Description", "Action"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((request, index) => {
                  return (
                    <tr key={request?.id} className=" border-b">
                      <td>{request?.name}</td>
                      <td>{request?.description}</td>
                      <td className=" group relative">
                        <span className=" p-2 bg-primary/15  rounded-lg">
                          ...
                        </span>
                        <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedId(String(request?.id));
                              setEditRoomOption(true);
                            }}
                            className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Edit Room Option
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedId(String(request?.id));
                              setOpenDelete(true);
                            }}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Delete Room Option
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
          label="Room Options"
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Room Option"
        description="Are you sure you want to delete this room option?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={editRoomOption}
        setOpen={setEditRoomOption}
        showXicon={true}
        title="Edit Room Option"
        className=" max-w-md"
      >
        <AddEditRoomOption
          setOpenOption={setEditRoomOption}
          id={selectedId}
          componentId="room"
        />
      </ModalTemplate>
    </>
  );
}
