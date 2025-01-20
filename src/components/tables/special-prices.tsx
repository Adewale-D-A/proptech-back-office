import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import { useAppDispatch } from "../../stores/hooks";
import NoResult from "../noResult";
import useGetSpecialPrices from "../../services-hooks/pricing/useGetSpecialPrices";
import MobileSpecialPrices from "./mobile/specialPrices";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useAxios from "../../useHooks/useAxios";
import { removeSpecialPricesInList } from "../../stores/apiData/special-prices";
import TableSearch from "../inputs/search/table-search";

export default function SpecialPricesTable() {
  const axios = useAxios();
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

  const { data, pagination, isLoading } = useGetSpecialPrices({
    page: currentPage,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    // sort: sort,
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
      await axios.delete(`/admin/special-price/${selectedId}`);
      dispatch(removeSpecialPricesInList({ id: selectedId }));
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
          <h2 className="text-xl font-semibold">Special Prices</h2>
          <div>
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
        </div>
        <div className="hidden md:block px-5">
          {data && data.length > 0 ? (
            <table className=" w-full overflow-x-auto">
              <thead className="">
                <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                  {["S/N", "Name", "Price", "Type", "Action"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {data.map((item, index) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td className=" min-w-16">{index + 1}</td>
                      <td className=" min-w-16">{item?.name}</td>
                      <td className=" text-lg  min-w-36">{`${item?.price}`}</td>
                      <td className=" text-lg  min-w-36">{`${item?.type}`}</td>

                      <td className=" group relative">
                        <span className=" p-2 text-lg bg-primary/15  rounded-lg">
                          ...
                        </span>
                        <span className="z-10 group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                          <Link
                            to={`/pricing/edit-special-price/${item?.id}`}
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
          <MobileSpecialPrices data={data} selectForDelete={selectForDelete} />
        </div>
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="special prices"
        />
      </div>

      <DeleteConfirmation
        confirmationHandler={deleteApartment}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Sepcial Price"
        description="Are you sure you want to delete this special price"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
