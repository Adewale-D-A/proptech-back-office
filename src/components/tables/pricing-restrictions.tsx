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
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Restrictions</h2>
          <div>
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
        </div>
        <div className="hidden md:block px-5">
          {data && data.length > 0 ? (
            <table className=" w-full overflow-x-auto">
              <thead className="">
                <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                  {["S/N", "Name", "Min Nights", "Max Nights", "Action"].map(
                    (head) => (
                      <th key={head}>{head}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="">
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
                      <td className=" group relative">
                        <span className=" p-2 text-lg bg-primary/15  rounded-lg">
                          ...
                        </span>
                        <span className="z-10 group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                          <Link
                            to={`/pricing/edit-restriction/${item?.id}`}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => selectForDelete(item?.id)}
                            className="text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Delete
                          </button>
                        </span>
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
        <div className="w-full block md:hidden">
          <MobilePriceRestriction data={data} handleDelete={selectForDelete} />
        </div>
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
