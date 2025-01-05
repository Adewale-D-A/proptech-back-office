import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import AddEditExtraOption from "../room-extra-options/add-edit-options";
import useGetExtraOptions from "../../services-hooks/useGetExtraOptions";

export default function ExtraOptionTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetExtraOptions({ page: currentPage });
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [editExtraOption, setExtraOption] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Extra Option List</h2>
          <Sort id="extra-options" label="Sort List" />{" "}
        </div>
        <table className=" w-full overflow-x-auto">
          <thead className="">
            <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
              {["Name of Option", "Description", "Action"].map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {data.map((request, index) => {
              return (
                <tr key={request?.id} className=" border-b">
                  <td>{request?.name}</td>
                  <td>{request?.description}</td>
                  <td className=" group relative">
                    <span className=" p-2 text-lg">...</span>
                    <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(String(request?.id));
                          setExtraOption(true);
                        }}
                        className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Edit Extra Option
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenDelete(true)}
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Delete Extra Option
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="Exra Options"
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Extra Option"
        description="Are you sure you want to delete this extra option?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={editExtraOption}
        setOpen={setExtraOption}
        showXicon={true}
        title="Edit Extra Option"
        className=" max-w-md"
      >
        <AddEditExtraOption
          setOpenOption={setExtraOption}
          id={selectedId}
          componentId="extra"
        />
      </ModalTemplate>
    </>
  );
}
