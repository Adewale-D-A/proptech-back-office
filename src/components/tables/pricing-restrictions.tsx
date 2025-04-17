import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import { useAppDispatch } from "../../stores/hooks";
import NoResult from "../noResult";
import useGetRestrictions from "../../services-hooks/pricing/useGetRestriction";
import MobilePriceRestriction from "./mobile/restriction";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useAxios from "../../useHooks/useAxios";
import { removeRestrictionssInList } from "../../stores/apiData/restrictions";
import TableSearch from "../inputs/search/table-search";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function PricingRestrictionsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const [search, setSearch] = useState("");
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  // const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, pagination, isLoading } = useGetRestrictions({
    page: currentPage,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    search,
  });

  // const handleSalesFiltering = useCallback(
  //   (start_date: string, end_date: string) => {
  //     setFilterDates({ start_date, end_date });
  //   },
  //   []
  // );

  const selectForDelete = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenDeleteConfirmation(true);
  }, []);

  const deleteApartment = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/restriction/${selectedId}`);
      dispatch(removeRestrictionssInList({ id: selectedId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: restrictions } = useGetResourceAccessChecker({
    resource: "restriction",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Restrictions</h2>
          <div>
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {["S/N", "Name", "Min Nights", "Max Nights", "Action"].map(
                    (head) => (
                      <th key={head}>{head}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td className=" min-w-16">{index + 1}</td>
                      <td className=" min-w-16">{item?.name}</td>
                      <td className=" text-lg  min-w-36">
                        {item?.min_no_of_nights}
                      </td>
                      <td className=" text-lg  min-w-36">
                        {item?.max_no_of_nights}
                      </td>
                      <td>
                        <TableActionDropDown>
                          <>
                            {restrictions?.update && (
                              <MenuItem>
                                <Link
                                  to={`/pricing/edit-restriction/${item?.id}`}
                                  className="p-3 px-4 text-left w-full hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Edit
                                </Link>
                              </MenuItem>
                            )}
                            {restrictions?.delete && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => selectForDelete(item?.id)}
                                  className="text-left p-3 px-4 w-full hover:bg-primary/10 transition-all rounded-lg"
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
          label="restrictions"
        />
      </div>

      <DeleteConfirmation
        confirmationHandler={deleteApartment}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Restriction"
        description="Are you sure you want to delete this restriction"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
