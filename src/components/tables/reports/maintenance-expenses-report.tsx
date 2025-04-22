import { useCallback, useState } from "react";
import Pagination from "../../pagination";
import NoResult from "../../noResult";
import Filter from "../../filterAndSort/filter";
import Sort from "../../filterAndSort/sort";
import TableSearch from "../../inputs/search/table-search";
import Status from "../../status";
// import ExportSelect from "../../inputs/select/exportSelect";
// import BinIcon from "../../../assets/icons/bin-icon";
// import useGetAllMaintenanceExpenses from "../../../services-hooks/reports/useGetAllMaintenanceExpenses";
import { useAppDispatch } from "../../../stores/hooks";
import useAxios from "../../../useHooks/useAxios";
import DeleteConfirmation from "../../infoModal/delete-confirmation";
import { removeMaintenanceExpensesInList } from "../../../stores/apiData/reports/maintenenace-expenses";
// import useGetRequisitionRequest from "../../../services-hooks/userGetRequisitionRequest";
import useGetRequisitionRequests from "../../../services-hooks/useGetRequisitionRequests";
import ExportToCSV from "../../export-to-csv";
import { maintenanceExpensesExportFormater } from "../../../utils/export-formerter-functions";
import useGetRequestCategories from "../../../services-hooks/useGetRequestCategories";
import Select from "../../inputs/select";

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
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
  //   useGetAllMaintenanceExpenses({
  //     page: currentPage,
  //     start_date: filterDates?.start_date,
  //     end_date: filterDates?.end_date,
  //     sort: sort,
  //     search,
  //   });

  const { data: categories } = useGetRequestCategories({
    page: currentPage,
    limit: 1000,
  });
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetRequisitionRequests({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      search,
      sort,
      category,
      paid: "yes",
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
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
          <div className=" flex items-center gap-2 flex-col md:flex-row">
            <Filter actionHandler={handleCustomersFiltering} />
            <div className=" w-fit min-w-40">
              <Sort setSort={setSort} id="sort-by" label="Sort by" />
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
          {data && data.length > 0 ? (
            <div className=" w-full overflow-x-auto">
              <table className=" w-full">
                <thead>
                  <tr>
                    {[
                      "ID",
                      "Payment date",
                      "Apartment",
                      "Category",
                      "Item",
                      // "Description of work",
                      "Total amount",
                      "Status",
                      // "Action",
                    ].map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {data.map((item) => {
                    return (
                      <tr key={item?.id} className=" border-b">
                        <td>
                          <span className=" rounded-full p-2 border border-primary">
                            {item?.id}
                          </span>
                        </td>
                        <td>{item?.date_paid}</td>
                        <td>{item?.shortlet?.name}</td>
                        <td>{item?.category?.name}</td>
                        {/* <td>{item?.item}</td> */}
                        <td>{item?.item}</td>
                        <td>{item?.amount}</td>
                        <td>
                          <Status status={item?.status} />
                        </td>
                        {/* <td>
                          <div className=" flex items-center gap-4">
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
            label="maintenance expenses"
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
