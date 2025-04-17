import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import AddEditExtraOption from "../room-extra-options/add-edit-options";
import useGetExtraOptions from "../../services-hooks/useGetExtraOptions";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeExtraOption } from "../../stores/apiData/extra-options";
import NoResult from "../noResult";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function ExtraOptionTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
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
      await axios.delete(`/admin/extra-option/${selectedId}`);
      dispatch(removeExtraOption({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: extra_option } = useGetResourceAccessChecker({
    resource: "extra-option",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Extra Option List</h2>
          <Sort id="extra-options" label="Sort List" />{" "}
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {["Name of Option", "Description", "Action"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td>{item?.name}</td>
                      <td>{item?.description}</td>
                      <td>
                        <TableActionDropDown>
                          <>
                            {extra_option?.update && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedId(String(item?.id));
                                    setExtraOption(true);
                                  }}
                                  className=" p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Edit Extra Option
                                </button>
                              </MenuItem>
                            )}
                            {extra_option?.delete && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedId(String(item?.id));
                                    setOpenDelete(true);
                                  }}
                                  className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Delete Extra Option
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
