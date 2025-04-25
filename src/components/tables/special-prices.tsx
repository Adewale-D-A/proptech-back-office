import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import { useAppDispatch } from "../../stores/hooks";
import NoResult from "../noResult";
import useGetSpecialPrices from "../../services-hooks/pricing/useGetSpecialPrices";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useAxios from "../../useHooks/useAxios";
import { removeSpecialPricesInList } from "../../stores/apiData/special-prices";
import TableSearch from "../inputs/search/table-search";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import currencyFormat from "../../utils/currency-formatter";

export default function SpecialPricesTable() {
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
  // const [sort, setSort] = useState("asc");
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

  const { data: special_prices } = useGetResourceAccessChecker({
    resource: "special-price",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Special Prices</h2>
          <div>
            <TableSearch setValue={setSearch} placeholder="Search..." />
          </div>
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {["S/N", "Name", "Price/value", "Type", "Action"].map(
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
                      <td className=" text-lg  min-w-36">{`${
                        item?.price_type === "price"
                          ? currencyFormat(item?.price)
                          : `${item?.percentage}%`
                      }`}</td>
                      <td className=" text-lg  min-w-36">{`${item?.price_type}`}</td>

                      <td>
                        <TableActionDropDown>
                          <>
                            {special_prices?.update && (
                              <MenuItem>
                                <Link
                                  to={`/pricing/edit-special-price/${item?.id}`}
                                  className="p-3 px-4 text-left w-full hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Edit
                                </Link>
                              </MenuItem>
                            )}
                            {special_prices?.update && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => selectForDelete(item?.id)}
                                  className="text-left p-3 px-4  w-full hover:bg-primary/10 transition-all rounded-lg"
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
