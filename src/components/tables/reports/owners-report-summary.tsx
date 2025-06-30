import { useCallback, useState } from "react";
import useGetAllOwnersReport from "../../../services-hooks/reports/useGetAllOwnersReport";
import BinIcon from "../../../assets/icons/bin-icon";
import PenIcon from "../../../assets/icons/pen";
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
import useExtractUrlParams from "../../../useHooks/extract-url-query-params";
import TableTemplate from "../table-template";
import { ownersReport } from "../../../types/apiData/reports";
import TableActionDropDown from "../../drop-down/table-action-dropdown";

export default function OwnersReportSummaryTableList() {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apartmentId, setApartmentId] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [category, setCategory] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "desc",
  });
  const { data, isLoading, pagination } = useGetAllOwnersReport({
    page,
    sort,
    limit: size,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    shortlet_id: buildingId && apartmentId ? String(apartmentId) : "",
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
                  <Sort id="owners-summary-sort" label="" defaultValue="desc" />
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

            <TableTemplate
              data={data}
              isLoading={isLoading}
              columns={[
                {
                  header: "Expense",
                  key: "expense",
                  showColumnSort: false,
                  render: (row: ownersReport) => (
                    <span>{row?.category?.name}</span>
                  ),
                },
                {
                  header: "Amount",
                  key: "amount",
                  showColumnSort: false,
                  render: (row: ownersReport) => (
                    <span>{currencyFormat(row?.amount || 0)}</span>
                  ),
                },
                {
                  header: "Note",
                  key: "note",
                  showColumnSort: false,
                  render: (row: ownersReport) => <span>{row?.note}</span>,
                },
                {
                  header: "Action",
                  key: "action",
                  render: (row: ownersReport) => (
                    <TableActionDropDown>
                      <div className=" flex items-center gap-4">
                        <button
                          title="edit"
                          onClick={() => openForEdit(row?.id)}
                        >
                          <PenIcon />
                        </button>
                        <button
                          title="delete"
                          onClick={() => handleOpenDelete(row?.id)}
                        >
                          <BinIcon className=" size-6 text-red-500" />
                        </button>
                      </div>
                    </TableActionDropDown>
                  ),
                },
              ]}
              showPaginator={true}
              pagination={pagination}
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
