import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import Search from "../inputs/search";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetPriceTypeLists from "../../services-hooks/useGetPriceTypeLists";
import { removePriceTypeInList } from "../../stores/apiData/price-type-lists";
import CheckSolidIcon from "../../assets/icons/check-solid";
import XSolidIcon from "../../assets/icons/x-solid";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";

export default function PriceTypeList({ header }: { header: string[] }) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetPriceTypeLists({ page: currentPage });
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const deleteApartment = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removePriceTypeInList({ id: selectedId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  // const { data: additional_services } = useGetResourceAccessChecker({
  //   resource: "special-price",
  // });
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Price List</h2>
          <Search
            placeholder="Invoice number, booking Id..."
            id="tax-rate-search"
          />
          <Filter />
          <Sort id="sort-tax-rate" label="Sort by" />
        </div>
        {data && data.length > 0 ? (
          <table className=" w-full text-xs overflow-x-auto">
            <thead className="">
              <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                {header.map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {data.map((item, index) => {
                return (
                  <tr key={item?.id} className=" border-b">
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.attributes}</td>
                    <td>{item?.rate}</td>
                    <td>
                      {item?.isBreakfastIncluded ? (
                        <CheckSolidIcon className=" text-green-500 w-5 h-5" />
                      ) : (
                        <XSolidIcon className=" text-red-500 w-5 h-6" />
                      )}
                    </td>
                    <td>
                      {item?.isRefundable ? (
                        <CheckSolidIcon className=" text-green-500 w-5 h-5" />
                      ) : (
                        <XSolidIcon className=" text-red-500 w-5 h-6" />
                      )}
                    </td>
                    <td>
                      <TableActionDropDown>
                        <>
                          <MenuItem>
                            <Link
                              to={`#/${item?.id}`}
                              className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                            >
                              Edit Price
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedId(item?.id);
                                setOpenDeleteConfirmation(true);
                              }}
                              className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                            >
                              Delete Price
                            </button>
                          </MenuItem>
                        </>
                      </TableActionDropDown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NoResult />
        )}
        <Pagination
          pagination={{
            current_page: 1,
            last_page: 2,
            per_page: 20,
            total: 24,
            from: 1,
            to: 1,
          }}
          setCurrentPage={setCurrentPage}
          isLoading={false}
          label="Price Lists"
        />
      </div>
      <DeleteConfirmation
        confirmationHandler={deleteApartment}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Price Type"
        description="Are you sure you want to delete this price type"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
