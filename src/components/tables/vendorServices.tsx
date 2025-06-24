import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../inputs/search";
import FilterSearch from "../filterAndSort/filter-search";
import { useAppDispatch } from "../../stores/hooks";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useGetAllVendorServiceLists from "../../services-hooks/useGetAllVendorServiceLists";
import { removeVendorServicesInList } from "../../stores/apiData/vendor-services-lists";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { vendorService } from "../../types/apiData/vendorServices";
import paginatedPageSerializer from "../../utils/page-serializer";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function VendorServiceListTable({
  header,
}: {
  header: string[];
}) {
  const dispatch = useAppDispatch();
  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetAllVendorServiceLists({
    page,
    sort,
    limit: size,
  });
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("1");

  const deleteApartment = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removeVendorServicesInList({ id: deleteId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [deleteId]);

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <Search
            placeholder="Apartment name, customer name..."
            id="apartment-search"
          />
          <FilterSearch />
        </div>

        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "S/N",
              key: "sn",
              render: (row: vendorService, index) => (
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
              header: "Vendor Name",
              key: "name",
              showColumnSort: true,
              render: (row: vendorService) => <span>{row?.vendorName}</span>,
            },
            {
              header: "Service Type",
              key: "price_value",
              showColumnSort: true,
              render: (row: vendorService) => <span>{row?.serviceType}</span>,
            },
            {
              header: "Description",
              key: "type",
              showColumnSort: true,
              render: (row: vendorService) => <span>{row?.description}</span>,
            },
            {
              header: "Date Created",
              key: "type",
              showColumnSort: true,
              render: (row: vendorService) => <span>{row?.date}</span>,
            },
            {
              header: "Price Per Person",
              key: "type",
              showColumnSort: true,
              render: (row: vendorService) => <span>{row?.price}</span>,
            },
            {
              header: "No of Bookings",
              key: "type",
              showColumnSort: true,
              render: (row: vendorService) => <span>{row?.bookingNo}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: vendorService) => (
                <TableActionDropDown>
                  <>
                    <MenuItem>
                      <Link
                        to={`/additional-services/vendor-details/${row?.id}`}
                        className="p-3 px-4 text-left w-full hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Service
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to={`#`}
                        className="p-3 px-4 text-left w-full hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Mark As Resolved
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteId(row?.id);
                          setOpenDeleteConfirmation(true);
                        }}
                        className="text-left p-3 px-4  w-full hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Delete Service
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
        title="Delete Service"
        description="Are you sure you want to delete this service"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
