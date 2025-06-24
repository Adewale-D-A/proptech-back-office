import { useCallback, useState } from "react";
import Filter from "../../filterAndSort/filter";
import Sort from "../../filterAndSort/sort";
import TableSearch from "../../inputs/search/table-search";
import Status from "../../status";
import { useAppDispatch } from "../../../stores/hooks";
import useAxios from "../../../useHooks/useAxios";
import DeleteConfirmation from "../../infoModal/delete-confirmation";
import { removeMaintenanceExpensesInList } from "../../../stores/apiData/reports/maintenenace-expenses";
import useGetRequisitionRequests from "../../../services-hooks/useGetRequisitionRequests";
import ExportToCSV from "../../export-to-csv";
import { maintenanceExpensesExportFormater } from "../../../utils/export-formerter-functions";
import useGetRequestCategories from "../../../services-hooks/useGetRequestCategories";
import Select from "../../inputs/select";
import useExtractUrlParams from "../../../useHooks/extract-url-query-params";
import TableTemplate from "../table-template";
import { requisitionRequest } from "../../../types/apiData/requisition-request";

export default function MaintenanceExpensesReportListTable() {
  const axios = useAxios({ disableErrMssg: false, disableSuccMssg: false });
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [category, setCategory] = useState("");
  // const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
  //   useGetAllMaintenanceExpenses({
  //     page: currentPage,
  //     start_date: filterDates?.start_date,
  //     end_date: filterDates?.end_date,
  //     sort: sort,
  //     search,
  //   });

  const { data: categories } = useGetRequestCategories({
    page: 1,
    limit: 1000,
  });

  const [{ page, size, sort, search }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "desc",
    search: "",
  });
  const { data, isLoading, pagination } = useGetRequisitionRequests({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    search,
    sort,
    category,
    paid: "yes",
    limit: size,
  });
  const handleCustomersFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );

  // const handleOpenDelete = useCallback((id: number) => {
  //   setSelectedId(String(id) || "");
  //   setOpenDelete(true);
  // }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      // await axios.delete(`/admin/extra-option/${selectedId}`);
      dispatch(removeMaintenanceExpensesInList({ id: Number(selectedId) }));
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
            <TableSearch placeholder="Search..." />
          </div>
          <div className=" flex items-center gap-2 flex-col md:flex-row">
            <Filter actionHandler={handleCustomersFiltering} />
            <div className=" w-fit min-w-40">
              <Sort id="sort-by" defaultValue="desc" label="Sort by" />
            </div>
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
          </div>
        </div>
        <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
          <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
            <div className=" flex items-center gap-4">
              <h2 className="text-xl font-semibold">Expenses</h2>
              <span className=" text-primary p-1 px-2 bg-primary/10 rounded-xl text-xs font-semibold">
                {pagination?.total} total
              </span>
            </div>
            <ExportToCSV
              dataset={data}
              jsonToCSVReformerter={maintenanceExpensesExportFormater}
              fileName="maintenance-expenses-list"
            />
          </div>
          <TableTemplate
            data={data}
            isLoading={isLoading}
            columns={[
              {
                header: "ID",
                key: "date",
                showColumnSort: true,
                render: (row: requisitionRequest) => (
                  <span className=" rounded-full p-2 border border-primary">
                    {row?.id}
                  </span>
                ),
              },
              {
                header: "Payment Date",
                key: "payment_date",
                showColumnSort: true,
                render: (row: requisitionRequest) => (
                  <span>{row?.date_paid}</span>
                ),
              },
              {
                header: "Apartment",
                key: "apartment",
                showColumnSort: true,
                render: (row: requisitionRequest) => (
                  <span>{row?.shortlet?.name}</span>
                ),
              },
              {
                header: "Category",
                key: "category",
                showColumnSort: true,
                render: (row: requisitionRequest) => (
                  <span>{row?.category?.name}</span>
                ),
              },
              {
                header: "Item",
                key: "item",
                showColumnSort: true,
                render: (row: requisitionRequest) => <span>{row?.item}</span>,
              },
              {
                header: "Total amount",
                key: "total_amount",
                showColumnSort: true,
                render: (row: requisitionRequest) => <span>{row?.amount}</span>,
              },
              {
                header: "Status",
                key: "status",
                showColumnSort: true,
                render: (row: requisitionRequest) => (
                  <Status status={row?.status} />
                ),
              },
            ]}
            showPaginator={true}
            pagination={pagination}
          />
        </div>
      </div>

      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete maintenance expense"
        description="Are you sure you want to delete this maintenance expense?"
        btnTitle="Yes, I want to"
      />
    </>
  );
}
