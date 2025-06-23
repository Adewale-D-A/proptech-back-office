import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import useGetAllPackagesAndOffers from "../../services-hooks/useGetPackageAndOffersLists";
import { removePackageAndOfferInList } from "../../stores/apiData/packages-and-offers";
import TableSearch from "../inputs/search/table-search";
import useAxios from "../../useHooks/useAxios";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { packagesAndOffers } from "../../types/apiData/packagesAndOffers";
import formatDate from "../../utils/isoDateConverter";

export default function PackagesAndOfferList({ header }: { header: string[] }) {
  const dispatch = useAppDispatch();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [{ page, size, sort, search }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
    search: "",
  });
  const { data, isLoading, pagination } = useGetAllPackagesAndOffers({
    page,
    search,
    sort,
    limit: size,
  });
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  const selectForDelete = useCallback((id: number) => {
    setSelectedId(String(id));
    setOpenDeleteConfirmation(true);
  }, []);

  const deleteApartment = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/offer/${selectedId}`);
      dispatch(removePackageAndOfferInList({ id: selectedId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: offer } = useGetResourceAccessChecker({
    resource: "offer",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Offer List</h2>
          <div className=" max-w-md">
            <TableSearch placeholder="name..." />
          </div>
          {/* <div className=" flex items-center gap-2 flex-col md:flex-row"> */}
          {/* <Filter actionHandler={handleCustomersFiltering} /> */}
          {/* <Sort setSort={setSort} id="sort-by" label="Sort by" /> */}
          {/* </div>        */}
        </div>

        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "ID",
              key: "id",
              render: (row: packagesAndOffers) => <span>{row?.id}</span>,
            },
            {
              header: "Package Name",
              key: "package_name",
              showColumnSort: true,
              render: (row: packagesAndOffers) => <span>{row?.name}</span>,
            },
            {
              header: "From This Date",
              key: "from_date",
              showColumnSort: true,
              render: (row: packagesAndOffers) => (
                <span>{formatDate(row?.start_date)}</span>
              ),
            },
            {
              header: "To this Date",
              key: "to_date",
              showColumnSort: true,
              render: (row: packagesAndOffers) => (
                <span>{formatDate(row?.start_date)}</span>
              ),
            },
            {
              header: "Price",
              key: "price",
              showColumnSort: true,
              render: (row: packagesAndOffers) => <span>{row?.price}</span>,
            },
            {
              header: "No of Rooms Affected",
              key: "rooms_affected",
              showColumnSort: true,
              render: (row: packagesAndOffers) => (
                <span>{row?.applicable_shortlet_count}</span>
              ),
            },
            {
              header: "Action",
              key: "action",
              render: (row: packagesAndOffers) => (
                <TableActionDropDown>
                  <>
                    {offer?.update && (
                      <MenuItem>
                        <Link
                          to={`/plans-and-promotions/package-and-offer/edit-new-package-and-offer/${row?.id}`}
                          className=" p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Offer
                        </Link>
                      </MenuItem>
                    )}{" "}
                    {offer?.delete && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => selectForDelete(row?.id)}
                          className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Offer
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
        title="Delete Offer"
        description="Are you sure you want to delete this offer"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
