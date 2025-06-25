import { useCallback, useState } from "react";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetAllCoupons from "../../services-hooks/useGetCouponLists";
import { removeCouponsInList } from "../../stores/apiData/coupons-lists";
import TableSearch from "../inputs/search/table-search";
import formatDate from "../../utils/isoDateConverter";
import useAxios from "../../useHooks/useAxios";
import ModalTemplate from "../modal";
import AddNewCoupon from "../inputs/plansAndPromotions/coupons";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { coupons } from "../../types/apiData/coupons";

export default function CouponList({ header }: { header: string[] }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
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
  const { data, isLoading, pagination } = useGetAllCoupons({
    page,
    start_date: filterDates?.start_date,
    end_date: filterDates?.end_date,
    sort,
    search,
    limit: size,
  });
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);

  const openDeletePrompt = useCallback((id: string) => {
    setSelectedId(id);
    setOpenDeleteConfirmation(true);
  }, []);

  const openCouponEditModal = useCallback((id: string) => {
    setSelectedId(id);
    setOpenEditModal(true);
  }, []);

  const deleteApartment = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/coupon/${selectedId}`);
      dispatch(removeCouponsInList({ id: selectedId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const handleCustomersFiltering = useCallback(
    (start_date: string, end_date: string) => {
      setFilterDates({ start_date, end_date });
    },
    []
  );
  const { data: coupon } = useGetResourceAccessChecker({
    resource: "coupon",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Coupon List</h2>
          <div className=" max-w-md">
            <TableSearch placeholder="First name, last name, email, phone number..." />
          </div>
          <div className=" flex items-center gap-2 flex-col md:flex-row">
            <Filter actionHandler={handleCustomersFiltering} />
            <Sort id="sort-by" label="Sort by" />
          </div>
        </div>

        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Coupon Code",
              key: "coupon_code",
              render: (row: coupons) => <span>{row?.code}</span>,
            },
            {
              header: "Coupon Type",
              key: "coupon_type",
              showColumnSort: false,
              render: (row: coupons) => <span>{row?.type}</span>,
            },
            {
              header: "Validity Dates",
              key: "validity_dates",
              showColumnSort: false,
              render: (row: coupons) => (
                <span>
                  {formatDate(row?.start_date)} - {formatDate(row?.end_date)}
                </span>
              ),
            },
            {
              header: "Number of Apartments",
              key: "number_of_apartments",
              render: (row: coupons) => (
                <span>{row?.applicable_shortlet_count}</span>
              ),
            },
            {
              header: "Number of Users",
              key: "number_of_users",
              render: (row: coupons) => (
                <span>{row?.applicable_user_count}</span>
              ),
            },
            {
              header: "Validity",
              key: "validity",
              render: (row: coupons) => <span>{row?.validity}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: coupons) => (
                <TableActionDropDown>
                  <>
                    {coupon?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            openCouponEditModal(String(row?.id));
                          }}
                          className=" p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Coupon
                        </button>
                      </MenuItem>
                    )}

                    {coupon?.delete && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            openDeletePrompt(String(row?.id));
                          }}
                          className="p-3 px-4 w-full text-left hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Coupon
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
        title="Delete Coupon"
        description="Are you sure you want to delete this coupon"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
      <ModalTemplate
        open={openEditModal}
        setOpen={setOpenEditModal}
        showXicon={true}
        title="Edit Coupon"
        className=" max-w-md"
      >
        <AddNewCoupon setOpen={setOpenEditModal} id={selectedId} />
      </ModalTemplate>
    </>
  );
}
