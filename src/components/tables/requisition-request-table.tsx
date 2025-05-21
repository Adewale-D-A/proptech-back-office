import { useCallback, useState } from "react";
import TableSearch from "../inputs/search/table-search";
import Filter from "../filterAndSort/filter";
import NoResult from "../noResult";
import Pagination from "../pagination";
import formatDate from "../../utils/isoDateConverter";
import Select from "../inputs/select";
import useGetRequisitionRequests from "../../services-hooks/useGetRequisitionRequests";
import Status from "../status";
import PenIcon from "../../assets/icons/pen";
import LoadingButton from "../button";
import PlusIcon from "../../assets/icons/plus";
import ModalTemplate from "../modal";
import AddEditRequisitionRequest from "../../pages/requests/requisition-requests/add-edit-requisition-requests";
import RequisitionRequestStatusChanger from "../../pages/requests/requisition-requests/staus-update";
import DoubleCheckIcon from "../../assets/icons/double-check";
import { requisitionRequest } from "../../types/apiData/requisition-request";
import useGetRequestCategories from "../../services-hooks/useGetRequestCategories";
import ExportToCSV from "../export-to-csv";
import { maintenanceExpensesExportFormater } from "../../utils/export-formerter-functions";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import Sort from "../filterAndSort/sort";
// import BinIcon from "../../assets/icons/bin-icon";
// import DeleteConfirmation from "../infoModal/delete-confirmation";
// import useAxios from "../../useHooks/useAxios";
// import { useAppDispatch } from "../../stores/hooks";
// import { removeRequisitionRequestInList } from "../../stores/apiData/requisition-requests";

export default function RequisitionRequestTable() {
  // const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  // const dispatch = useAppDispatch();

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState("");
  const [requisitionItem, setRequistionItem] = useState<requisitionRequest>(
    {} as any
  );
  const [openRequest, setOpenRequest] = useState(false);

  const [openStatusUpdate, setOpenStatusUpdate] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);

  const { data: categories } = useGetRequestCategories({
    page: currentPage,
    limit: 1000,
  });
  const { data, isLoading, retryFunction, pagination } =
    useGetRequisitionRequests({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      search,
      sort,
      category,
    });
  const handleFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  const openForNewRequest = useCallback(() => {
    setSelectedId("");
    setOpenRequest(true);
  }, []);

  const openForEdit = useCallback((item: requisitionRequest) => {
    setRequistionItem(item);
    setOpenRequest(true);
  }, []);

  const openForStatusUpdate = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenStatusUpdate(true);
  }, []);
  // const handleOpenDelete = useCallback((id: number) => {
  //   setSelectedId(String(id) || "");
  //   setOpenDelete(true);
  // }, []);

  // const handleDelete = useCallback(async () => {
  //   setIsDeleting(true);
  //   try {
  //     // await axios.delete(`/admin/extra-option/${selectedId}`);
  //     dispatch(removeRequisitionRequestInList({ id: Number(selectedId) }));
  //     setOpenDelete(false);
  //   } catch (error) {
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // }, [selectedId]);

  const { data: requisition_request } = useGetResourceAccessChecker({
    resource: "requisition-request",
  });
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex items-center flex-col md:flex-row justify-between gap-3">
          <div className=" max-w-md">
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
          <div className=" flex items-center gap-3 flex-col md:flex-row">
            <Select
              isRequired={true}
              value={category}
              setValue={setCategory}
              id="categories-filtering"
            >
              <option value="">All categories</option>
              {categories?.map((item) => (
                <option key={item?.id} value={String(item?.id || "")}>
                  {item?.name}
                </option>
              ))}
            </Select>
            <div className=" min-w-40">
              <Sort
                setSort={setSort}
                id="sort-by"
                label="Sort by"
                defaultValue="desc"
              />
            </div>
            <Filter actionHandler={handleFiltering} />
          </div>
        </div>
        <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
          <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
            <h2 className="text-xl font-semibold">Requisition Requests</h2>{" "}
            <div className=" w-fit flex items-center gap-3">
              <ExportToCSV
                dataset={data}
                jsonToCSVReformerter={maintenanceExpensesExportFormater}
                fileName="requisition-request-list"
              />

              <LoadingButton
                label="New request"
                isLoading={false}
                type="button"
                clickHandler={() => openForNewRequest()}
                startIcon={<PlusIcon />}
              />
            </div>
          </div>
          <div className="block px-5">
            {data && data.length > 0 ? (
              <div className=" w-full overflow-x-auto">
                <table className=" w-full">
                  <thead>
                    <tr>
                      {[
                        "Requesting employee",
                        "Apartment",
                        "Amount",
                        "Currency",
                        "Request date",
                        "Paid",
                        "Status",
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
                          <td className=" flex gap-2 items-center min-w-36">
                            <img
                              src={"/logo_blue.png"}
                              alt={item?.admin?.first_name}
                              className=" h-10 w-10 rounded aspect-square"
                            />
                            <span className=" flex flex-col gap-1">
                              <span>{item?.admin?.first_name}</span>
                              <span className=" text-xs text-gray-500 flex items-center gap-1">
                                {item?.admin?.last_name}
                              </span>
                            </span>
                          </td>
                          <td className=" text-lg  min-w-36">
                            {item?.shortlet?.name}
                          </td>
                          <td>{item?.amount}</td>
                          <td>{item?.currency}</td>
                          <td>{formatDate(item?.created_at)}</td>
                          <td>
                            <Status
                              status={"requisition_payment_state"}
                              booleanVal={Boolean(item?.is_paid)}
                              truthyMessage="Yes"
                              falsyMessage="No"
                            />
                          </td>
                          <td>
                            <Status status={item?.status} />
                          </td>
                          <td>
                            <div className=" flex items-center gap-4">
                              {requisition_request?.update && (
                                <button
                                  onClick={() => openForStatusUpdate(item?.id)}
                                  // title="mark as paid"
                                >
                                  <DoubleCheckIcon className=" size-8" />
                                </button>
                              )}
                              {requisition_request?.update && (
                                <button
                                  title="edit"
                                  onClick={() => openForEdit(item)}
                                >
                                  <PenIcon />
                                </button>
                              )}
                              {/* <button
                              title="delete"
                              onClick={() => handleOpenDelete(item?.id)}
                            >
                              <BinIcon className=" size-6 text-red-500" />
                            </button> */}
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
          </div>
          <Pagination
            pagination={pagination}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            label="Requisition requests"
          />
        </div>
      </div>

      {/* <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Requisition Request"
        description="Are you sure you want to delete this requisition request?"
        btnTitle="Yes, I want to"
      /> */}
      <ModalTemplate
        open={openRequest}
        setOpen={setOpenRequest}
        showXicon={true}
        title="Requisition"
        className=" max-w-screen-md"
      >
        <AddEditRequisitionRequest
          requisitionItem={requisitionItem}
          id={String(requisitionItem?.id || "")}
          setOpen={setOpenRequest}
          refetch={retryFunction}
        />
      </ModalTemplate>
      <ModalTemplate
        open={openStatusUpdate}
        setOpen={setOpenStatusUpdate}
        showXicon={true}
        title="Requisition Status Update"
        className=" max-w-screen-md"
      >
        <RequisitionRequestStatusChanger
          id={selectedId}
          setOpen={setOpenStatusUpdate}
        />
      </ModalTemplate>
    </>
  );
}
