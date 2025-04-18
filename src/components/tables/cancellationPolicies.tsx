import { useCallback, useState } from "react";
import Pagination from "../pagination";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import TableSearch from "../inputs/search/table-search";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import NoResult from "../noResult";
import paginatedPageSerializer from "../../utils/page-serializer";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useGetCancellationPolcies from "../../services-hooks/apartment/useGetCancellationPolicies";
import AddEditCancellationPolicy from "../../pages/apartments/cancellation-policy/add-edit";
import { removeCancellationPolicyInList } from "../../stores/apiData/apartment/cancellation-policies";

export default function CancellationPoliciesTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetCancellationPolcies({ page: currentPage, search });

  const [selectedId, setSelectedId] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpeEdit = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenEdit(true);
  }, []);

  const handleOpenDelete = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/cancellation-policy/${selectedId}`);
      dispatch(removeCancellationPolicyInList({ id: Number(selectedId) }));
      dispatch(
        openSnackbar({
          message: "Cancellation policy successfully deleted",
          isError: false,
        })
      );
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: cancellation_policy } = useGetResourceAccessChecker({
    resource: "cancelation-policy",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Cancellation Policies</h2>
          <div className=" max-w-md">
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full overflow-x-auto">
              <thead>
                <tr>
                  {["S/N", "Name", "Action"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td>
                        {paginatedPageSerializer({
                          currentPage: pagination?.current_page,
                          pageSize: pagination?.per_page,
                          index,
                        })}
                      </td>
                      <td>{item?.name}</td>
                      <td>
                        <TableActionDropDown>
                          <>
                            {cancellation_policy?.update && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => handleOpeEdit(item?.id)}
                                  className=" p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Edit
                                </button>
                              </MenuItem>
                            )}
                            {cancellation_policy?.update && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => handleOpenDelete(item?.id)}
                                  className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
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
          label="cancellation policy"
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Cancellation Policy"
        description="Are you sure you want to delete this cancellation policy?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openEdit}
        setOpen={setOpenEdit}
        showXicon={true}
        title="Edit Cancellation Policy"
        className=" max-w-md"
      >
        <AddEditCancellationPolicy setOpen={setOpenEdit} id={selectedId} />
      </ModalTemplate>
    </>
  );
}
