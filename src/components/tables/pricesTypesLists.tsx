import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
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
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import { priceTypes } from "../../types/apiData/priceTypes";
import TableTemplate from "./table-template";

export default function PriceTypeList({ header }: { header: string[] }) {
  const dispatch = useAppDispatch();

  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetPriceTypeLists({
    page,
    sort,
    limit: size,
  });
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
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Price Name",
              key: "name",
              render: (row: priceTypes) => <span>{row?.name}</span>,
            },
            {
              header: "Price Attributes",
              key: "price_attributes",
              showColumnSort: true,
              render: (row: priceTypes) => <span>{row?.attributes}</span>,
            },
            {
              header: "Tax Rates",
              key: "tax_rates",
              showColumnSort: true,
              render: (row: priceTypes) => <span>{row?.rate}</span>,
            },
            {
              header: "Restrictions",
              key: "restrictions",
              showColumnSort: true,
              render: (row: priceTypes) => (
                <span>
                  {row?.isBreakfastIncluded ? (
                    <CheckSolidIcon className=" text-green-500 w-5 h-5" />
                  ) : (
                    <XSolidIcon className=" text-red-500 w-5 h-6" />
                  )}
                </span>
              ),
            },
            {
              header: "Breakfast Included",
              key: "breakfast_included",
              showColumnSort: true,
              render: (row: priceTypes) => (
                <span>
                  {row?.isRefundable ? (
                    <CheckSolidIcon className=" text-green-500 w-5 h-5" />
                  ) : (
                    <XSolidIcon className=" text-red-500 w-5 h-6" />
                  )}
                </span>
              ),
            },
            // {
            //   header: "Refundable",
            //   key: "refundable",
            //   showColumnSort: true,
            //   render: (row: priceTypes) => (
            //     <span>{row?.applicable_shortlet_count}</span>
            //   ),
            // },
            {
              header: "Action",
              key: "action",
              render: (row: priceTypes) => (
                <TableActionDropDown>
                  <>
                    <MenuItem>
                      <Link
                        to={`#/${row?.id}`}
                        className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Edit Price
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(row?.id);
                          setOpenDeleteConfirmation(true);
                        }}
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Delete Price
                      </button>
                    </MenuItem>
                  </>
                </TableActionDropDown>
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
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
