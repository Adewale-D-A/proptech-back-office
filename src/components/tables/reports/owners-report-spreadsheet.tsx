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
import monthsAndDays from "../../../assets/days-months.json";
import TableSearch from "../../inputs/search/table-search";
import UpdateManagementFee from "../../../pages/reports/owners/update-management-fee";
import PencilSquareIcon from "../../../assets/icons/pencil-square";

export default function OwnersReportSpreadsheetTableList() {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();

  const [selectedId, setSelectedId] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openMgtFeeModal, setOpenMgtFeeModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllOwnersReport({
      page: currentPage,
      start_date: "",
      end_date: "",
      search,
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
        <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
          <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
            <div className=" max-w-md">
              <TableSearch setValue={setSearch} placeholder="Search..." />
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
          {data && data?.data?.length > 0 ? (
            <div className=" w-full overflow-x-auto">
              <table className=" w-full">
                <thead>
                  <tr>
                    {["Expense", ...monthsAndDays.months, "Action"].map(
                      (head) => (
                        <th key={head}>{head}</th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item) => {
                    return (
                      <tr key={item?.id} className=" border-b">
                        <td>{item?.expense?.name}</td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.jan || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.feb || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.mar || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.apr || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.may || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.jun || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.jul || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.aug || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.sep || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.oct || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.nov || 0.0)}
                        </td>
                        <td>
                          &#8358;{String(item?.monthly_amount?.dec || 0.0)}
                        </td>
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
                  {/* totals  */}
                  <tr className=" border-b">
                    <td className=" bg-[#E4E7EC]">Total</td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.jan || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.feb || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.mar || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.apr || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.may || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.jun || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.jul || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.aug || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.sep || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.oct || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.nov || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_totals?.dec || 0.0)}
                    </td>
                    <td></td>
                  </tr>
                  {/* revenue */}
                  <tr className=" border-b">
                    <td className=" bg-[#FEF0C7]">Revenue</td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.jan || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.feb || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.mar || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.apr || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.may || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.jun || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.jul || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.aug || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.sep || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.oct || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.nov || 0.0)}
                    </td>
                    <td>
                      &#8358;
                      {String(data?.summary?.monthly_revenue?.dec || 0.0)}
                    </td>
                    <td></td>
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
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.jan || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.feb || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.mar || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.apr || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.may || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.jun || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.jul || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.aug || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.sep || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.oct || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.nov || 0.0
                      )}
                    </td>
                    <td>
                      &#8358;
                      {String(
                        data?.summary?.monthly_management_fee?.dec || 0.0
                      )}
                    </td>
                    <td></td>
                  </tr>
                  {/* profit */}
                  <tr className=" border-b">
                    <td className="bg-[#D1FADF]">Profit</td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.jan || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.feb || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.mar || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.apr || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.may || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.jun || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.jul || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.aug || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.sep || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.oct || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.nov || 0.0)}
                    </td>
                    <td>
                      &#8358;{String(data?.summary?.monthly_profit?.dec || 0.0)}
                    </td>
                    <td></td>
                  </tr>
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
