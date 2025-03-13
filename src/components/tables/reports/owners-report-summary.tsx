import { useCallback, useState } from "react";
import useGetAllOwnersReport from "../../../services-hooks/reports/useGetAllOwnersReport";
import ExportSelect from "../../inputs/select/exportSelect";
import BinIcon from "../../../assets/icons/bin-icon";
import PenIcon from "../../../assets/icons/pen";
import NoResult from "../../noResult";
import Pagination from "../../pagination";
import useAxios from "../../../useHooks/useAxios";
import { useAppDispatch } from "../../../stores/hooks";
import { removeOwnersReportInList } from "../../../stores/apiData/reports/owners-report";
import DeleteConfirmation from "../../infoModal/delete-confirmation";
import AddEditOwnersReport from "../../../pages/reports/owners/add-edit";
import ModalTemplate from "../../modal";
import LoadingButton from "../../button";
import PlusIcon from "../../../assets/icons/plus";
import MonthsCarousel from "../../../pages/reports/owners/months-carousel";

export default function OwnersReportSummaryTableList() {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllOwnersReport({
      page: currentPage,
      start_date: "",
      end_date: "",
    });

  const openForNewRequest = useCallback(() => {
    setSelectedId("");
    setOpenModal(true);
  }, []);

  const openForEdit = useCallback((id: number) => {
    setSelectedId(String(id || ""));
    setOpenModal(true);
  }, []);

  const handleOpenDelete = useCallback((id: number) => {
    setSelectedId(String(id) || "");
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      // await axios.delete(`/admin/extra-option/${selectedId}`);
      dispatch(removeOwnersReportInList({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);
  return (
    <>
      <div className=" w-full flex flex-col gap-3">
        <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
          <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
            <div className=" flex items-center gap-3">
              <MonthsCarousel />
            </div>
            <div className=" flex items-center gap-2">
              <ExportSelect id="report" />
              <LoadingButton
                label="New entry"
                startIcon={<PlusIcon />}
                type="button"
                isLoading={false}
                clickHandler={() => openForNewRequest()}
              />
            </div>
          </div>
          <div className="block px-5">
            {data && data.length > 0 ? (
              <table className=" w-full text-xs  overflow-x-auto">
                <thead className="">
                  <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                    {["Expense", "Amount", "Note", "Action"].map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {data.map((item) => {
                    return (
                      <tr key={item?.id} className=" border-b">
                        <td>{item?.expense?.name}</td>
                        <td>&#8358;{String(item?.amount || 0)}</td>
                        <td>{item?.additional_note}</td>
                        <td>
                          <div className=" flex items-center gap-4">
                            <button
                              title="edit"
                              onClick={() => openForEdit(item?.id)}
                            >
                              <PenIcon />
                            </button>
                            <button
                              title="delete"
                              onClick={() => handleOpenDelete(item?.id)}
                            >
                              <BinIcon className=" size-6 text-red-500" />
                            </button>
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
          </div>
          <Pagination
            pagination={pagination}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            label="owners report"
          />
        </div>
      </div>

      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete owner's report"
        description="Are you sure you want to delete this owner's report?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openModal}
        setOpen={setOpenModal}
        showXicon={true}
        title="Owner report"
        className=" max-w-screen-md"
      >
        <AddEditOwnersReport id={selectedId} setOpen={setOpenModal} />
      </ModalTemplate>
    </>
  );
}
