import { useCallback, useState } from "react";
import NoResult from "../../noResult";
// import useAxios from "../../../useHooks/useAxios";
import { useAppDispatch } from "../../../stores/hooks";
import { removeOwnersReportInList } from "../../../stores/apiData/reports/owners-report";
import DeleteConfirmation from "../../infoModal/delete-confirmation";
import AddEditOwnersReport from "../../../pages/reports/owners/add-edit";
import ModalTemplate from "../../modal";
import LoadingButton from "../../button";
import PlusIcon from "../../../assets/icons/plus";
import monthsAndDays from "../../../assets/days-months.json";
import UpdateManagementFee from "../../../pages/reports/owners/update-management-fee";
import PencilSquareIcon from "../../../assets/icons/pencil-square";
import OwnersReportFilterOptions from "../../../pages/reports/owners/filter-options";
import useGetAllOwnersReportSpreadsheet from "../../../services-hooks/reports/useGetAllOwnersReportSpreadsheet";
import currencyFormat from "../../../utils/currency-formatter";
import ExportToCSV from "../../export-to-csv";
import { ownersReportSpreadsheetExportFormater } from "../../../utils/export-formerter-functions";
// import useGetAllOwnersReport from "../../../services-hooks/reports/useGetAllOwnersReport";
// import BinIcon from "../../../assets/icons/bin-icon";
// import PenIcon from "../../../assets/icons/pen";
// import Pagination from "../../pagination";

export default function OwnersReportSpreadsheetTableList() {
  // const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();

  const [selectedId, setSelectedId] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openMgtFeeModal, setOpenMgtFeeModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [apartmentId, setApartmentId] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [category, setCategory] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllOwnersReportSpreadsheet({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      search,
      building_id: buildingId,
      apartment_id: apartmentId,
      expense_category_id: category,
    });

  const openForNewRequest = useCallback(() => {
    setSelectedId("");
    setOpenModal(true);
  }, []);

  // const openForEdit = useCallback((id: number) => {
  //   setSelectedId(String(id || ""));
  //   setOpenModal(true);
  // }, []);

  // const handleOpenDelete = useCallback((id: number) => {
  //   setSelectedId(String(id) || "");
  //   setOpenDelete(true);
  // }, []);

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
              <div className=" max-w-md">
                {/* <TableSearch setValue={setSearch} placeholder="Search..." /> */}
              </div>
              <div className=" flex items-center gap-2">
                <ExportToCSV
                  dataset={data?.data}
                  jsonToCSVReformerter={ownersReportSpreadsheetExportFormater}
                  fileName="owners-report-spreadsheet"
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
            {data && data?.data?.length > 0 ? (
              <div className=" w-full overflow-x-auto">
                <table className=" w-full">
                  <thead>
                    <tr>
                      {["Expense", ...monthsAndDays.months].map((head) => (
                        <th key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((item) => {
                      return (
                        <tr key={item?.expense_name} className=" border-b">
                          <td>{item?.expense_name}</td>
                          {item?.monthly_total_expenses.map((item) => (
                            <td key={item?.month}>
                              {currencyFormat(item?.total || 0.0)}
                            </td>
                          ))}
                          {/* <td>
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
                          </td> */}
                        </tr>
                      );
                    })}
                    {/* totals  */}
                    <tr className=" border-b">
                      <td className=" bg-[#E4E7EC]">Total</td>
                      {data?.monthlySummaries.map((item, index) => (
                        <td key={index}>
                          {currencyFormat(item?.total_expenses || 0.0)}
                        </td>
                      ))}
                      {/* <td></td> */}
                    </tr>
                    {/* revenue */}
                    <tr className=" border-b">
                      <td className=" bg-[#FEF0C7]">Revenue</td>
                      {data?.monthlySummaries.map((item, index) => (
                        <td key={index}>
                          {currencyFormat(item?.revenue || 0.0)}
                        </td>
                      ))}
                      {/* <td></td> */}
                    </tr>
                    {/* management fee */}
                    <tr className=" border-b">
                      <td className=" bg-[#FEC7C7]">
                        <div className=" flex items-center justify-between gap-2">
                          <span>Management fee </span>
                          <button
                            onClick={() => setOpenMgtFeeModal(true)}
                            className=" aspect-square rounded-full bg-white border border-green-300 p-1 hover:scale-125 transition-all"
                          >
                            <PencilSquareIcon className=" w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      </td>
                      {data?.monthlySummaries.map((item, index) => (
                        <td key={index}>
                          {currencyFormat(item?.management_fee || 0.0)}{" "}
                        </td>
                      ))}
                      {/* <td></td> */}
                    </tr>
                    {/* profit */}
                    <tr className=" border-b">
                      <td className="bg-[#D1FADF]">Profit</td>
                      {data?.monthlySummaries.map((item, index) => (
                        <td key={index}>
                          {currencyFormat(item?.profit || 0.0)}
                        </td>
                      ))}
                      {/* <td></td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <NoResult />
            )}
            {/* <Pagination
              pagination={pagination}
              setCurrentPage={setCurrentPage}
              isLoading={isLoading}
              label="owners report"
            /> */}
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
      <ModalTemplate
        open={openMgtFeeModal}
        setOpen={setOpenMgtFeeModal}
        showXicon={true}
        title="Edit Management Fee"
        className=" max-w-screen-md"
      >
        <UpdateManagementFee setOpen={setOpenMgtFeeModal} />
      </ModalTemplate>
    </>
  );
}
