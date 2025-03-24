import { useCallback, useState } from "react";
import Pagination from "../../pagination";
import NoResult from "../../noResult";
import TableSearch from "../../inputs/search/table-search";
import Status from "../../status";
import ExportSelect from "../../inputs/select/exportSelect";
import Filter from "../../filterAndSort/filter";
import Sort from "../../filterAndSort/sort";
import PenIcon from "../../../assets/icons/pen";
import BinIcon from "../../../assets/icons/bin-icon";
import useGetALlGeneratorRuntimeReports from "../../../services-hooks/reports/useGetAllGeneratorRuntimeReports";
import { useAppDispatch } from "../../../stores/hooks";
import useAxios from "../../../useHooks/useAxios";
import { removeGeneratorRuntimeInList } from "../../../stores/apiData/reports/generator-runtime";
import DeleteConfirmation from "../../infoModal/delete-confirmation";
import formatDate from "../../../utils/isoDateConverter";
import ModalTemplate from "../../modal";
import AddEditGeneratorRuntime from "../../generator-runtime-add-edit/add-edit";
import LoadingButton from "../../button";
import PlusIcon from "../../../assets/icons/plus";

export default function GeneratorRuntimeReportListTable() {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);

  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetALlGeneratorRuntimeReports({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
    });
  const handleCustomersFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

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
      dispatch(removeGeneratorRuntimeInList({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);
  return (
    <>
      <div className=" w-full flex flex-col gap-3">
        <div className="w-full flex justify-between gap-4 flex-col md:flex-row">
          <div className=" max-w-md">
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
          <div className=" flex items-center gap-2 flex-col md:flex-row">
            <Filter actionHandler={handleCustomersFiltering} />
            <Sort setSort={setSort} id="sort-by" label="Sort by" />
          </div>
        </div>
        <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
          <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
            <div className=" flex items-center gap-4">
              <h2 className="text-xl font-semibold">Generator run-time</h2>
              <span className=" text-primary p-1 px-2 bg-primary/10 rounded-xl text-xs font-semibold">
                {pagination?.total} total
              </span>
            </div>
            <div className=" w-fit flex items-center gap-3">
              <ExportSelect id="report" />
              <LoadingButton
                label="New entry"
                isLoading={false}
                type="button"
                clickHandler={() => openForNewRequest()}
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          {data && data.length > 0 ? (
            <div className=" w-full overflow-x-auto">
              <table className=" w-full">
                <thead>
                  <tr>
                    {[
                      "Apartment",
                      "Date",
                      "Time-On",
                      "Time-off",
                      "Run-time (HR:Min)",
                      "Action",
                    ].map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr key={item?.id} className=" border-b">
                        <td>{item?.shortlet_name}</td>
                        <td>{formatDate(item?.date)}</td>
                        <td>{item?.time_on}</td>
                        <td>{item?.time_off}</td>
                        <td>{item?.run_time}</td>
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
            label="generator runtime"
          />
        </div>
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete generator runtime"
        description="Are you sure you want to delete this generator runtime?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openModal}
        setOpen={setOpenModal}
        showXicon={true}
        title="Generator Runtime report"
        className=" max-w-screen-md"
      >
        <AddEditGeneratorRuntime id={selectedId} setOpen={setOpenModal} />
      </ModalTemplate>
    </>
  );
}
