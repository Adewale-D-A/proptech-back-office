import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks";
import useGetSpecialPrices from "../../services-hooks/pricing/useGetSpecialPrices";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useAxios from "../../useHooks/useAxios";
import { removeSpecialPricesInList } from "../../stores/apiData/special-prices";
import TableSearch from "../inputs/search/table-search";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import currencyFormat from "../../utils/currency-formatter";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { specialPrices } from "../../types/apiData/specialPrices";
import paginatedPageSerializer from "../../utils/page-serializer";

export default function SpecialPricesTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const [{ page, size, sort, search }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });
  const { data, pagination, isLoading } = useGetSpecialPrices({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    search,
    limit: size,
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
            <TableSearch placeholder="Search..." />
          </div>
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "S/N",
              key: "sn",
              render: (row: specialPrices, index) => (
                <span>
                  {paginatedPageSerializer({
                    currentPage: pagination?.current_page,
                    pageSize: pagination?.per_page,
                    index: index || 0,
                  })}
                </span>
              ),
            },
            {
              header: "Name",
              key: "name",
              showColumnSort: false,
              render: (row: specialPrices) => <span>{row?.name}</span>,
            },
            {
              header: "Price/value",
              key: "price_value",
              showColumnSort: false,
              render: (row: specialPrices) => (
                <span>{`${
                  row?.price_type === "price"
                    ? currencyFormat(row?.price)
                    : `${row?.percentage}%`
                }`}</span>
              ),
            },
            {
              header: "Type",
              key: "type",
              showColumnSort: false,
              render: (row: specialPrices) => <span>{row?.price_type}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: specialPrices) => (
                <TableActionDropDown>
                  <>
                    {special_prices?.update && (
                      <MenuItem>
                        <Link
                          to={`/pricing/edit-special-price/${row?.id}`}
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
                          onClick={() => selectForDelete(row?.id)}
                          className="text-left p-3 px-4  w-full hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete
                        </button>
                      </MenuItem>
                    )}
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
        title="Delete Sepcial Price"
        description="Are you sure you want to delete this special price"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
