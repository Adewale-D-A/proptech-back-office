import { useCallback, useState } from "react";
import useGetAllOwnersReport from "../../../services-hooks/reports/useGetAllOwnersReport";
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
import OwnersReportFilterOptions from "../../../pages/reports/owners/filter-options";
import ExportToCSV from "../../export-to-csv";
import { ownersReportExportFormater } from "../../../utils/export-formerter-functions";
import currencyFormat from "../../../utils/currency-formatter";
import Sort from "../../filterAndSort/sort";

export default function OwnersReportSummaryTableList() {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [sort, setSort] = useState("desc");
  const [apartmentId, setApartmentId] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [category, setCategory] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const { data, isLoading, pagination } = useGetAllOwnersReport({
    page: currentPage,
    sort,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    shortlet_id: String(apartmentId || ""),
    expense_category_id: category,
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
      await axios.delete(`/admin/owner-report/${selectedId}`);
      dispatch(removeOwnersReportInList({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);
  return (
    <>
      <div className="w-full flex flex-col gap-10">
        <OwnersReportFilterOptions
          apartmentId={apartmentId}
          setApartmentId={setApartmentId}
          category={category}
          setCategory={setCategory}
          setFilterDates={setFilterDates}
          buildingId={buildingId}
          setBuildingId={setBuildingId}
        />

        <div className=" w-full flex flex-col gap-3">
          <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
            <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
              <div className=" flex items-center gap-3">
                <MonthsCarousel setFilterDate={setFilterDates} />
              </div>
              <div className=" flex items-center gap-2">
                <div className="w-fit min-w-28">
                  <Sort
                    id="owners-summary-sort"
                    label=""
                    defaultValue="desc"
                    setSort={setSort}
                  />
                </div>
                <ExportToCSV
                  dataset={data}
                  jsonToCSVReformerter={ownersReportExportFormater}
                  fileName="owners-report-summary"
                />
                <LoadingButton
                  label="New entry"
                  startIcon={<PlusIcon />}
                  type="button"
                  isLoading={false}
                  clickHandler={() => openForNewRequest()}
                />
              </div>
            </div>
            {data && data?.length > 0 ? (
              <div className=" w-full overflow-x-auto">
                <table className=" w-full">
                  <thead>
                    <tr>
                      {["Expense", "Amount", "Note", "Action"].map((head) => (
                        <th key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.map((item) => {
                      return (
                        <tr key={item?.id} className=" border-b">
                          <td>{item?.expense_category?.name}</td>
                          <td>{currencyFormat(item?.amount || 0)}</td>
                          <td>{item?.note}</td>
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
              </div>
            ) : (
              <NoResult />
            )}
            <Pagination
              pagination={pagination}
              setCurrentPage={setCurrentPage}
              isLoading={isLoading}
              label="owners report"
            />
          </div>
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
