import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks";
import useGetRestrictions from "../../services-hooks/pricing/useGetRestriction";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import useAxios from "../../useHooks/useAxios";
import { removeRestrictionssInList } from "../../stores/apiData/restrictions";
import TableSearch from "../inputs/search/table-search";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { restriction } from "../../types/apiData/restrictions";
import paginatedPageSerializer from "../../utils/page-serializer";

export default function PricingRestrictionsTable() {
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
  const { data, pagination, isLoading } = useGetRestrictions({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    search,
    sort,
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
              render: (row: restriction, index) => (
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
              render: (row: restriction) => <span>{row?.name}</span>,
            },
            {
              header: "Min Nights",
              key: "min_nights",
              showColumnSort: false,
              render: (row: restriction) => (
                <span> {row?.min_no_of_nights}</span>
              ),
            },
            {
              header: "Max Nights",
              key: "max_nights",
              showColumnSort: false,
              render: (row: restriction) => (
                <span> {row?.max_no_of_nights}</span>
              ),
            },
            {
              header: "Action",
              key: "action",
              render: (row: restriction) => (
                <TableActionDropDown>
                  <>
                    {restrictions?.update && (
                      <MenuItem>
                        <Link
                          to={`/pricing/edit-restriction/${row?.id}`}
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
                          onClick={() => selectForDelete(row?.id)}
                          className="text-left p-3 px-4 w-full hover:bg-primary/10 transition-all rounded-lg"
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
        title="Delete Restriction"
        description="Are you sure you want to delete this restriction"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
    </>
  );
}
