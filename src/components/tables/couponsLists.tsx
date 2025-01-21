import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import useGetAllCoupons from "../../services-hooks/useGetCouponLists";
import { removeCouponsInList } from "../../stores/apiData/coupons-lists";
import TableSearch from "../inputs/search/table-search";
import MobileCouponTable from "./mobile/coupons";
import formatDate from "../../utils/isoDateConverter";
import useAxios from "../../useHooks/useAxios";
import ModalTemplate from "../modal";
import AddNewCoupon from "../inputs/plansAndPromotions/coupons";

export default function CouponList({ header }: { header: string[] }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllCoupons({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
      search,
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
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Coupon List</h2>
          <div className=" max-w-md">
            <TableSearch
              setValue={setSearch}
              placeholder="First name, last name, email, phone number..."
            />
          </div>
          <div className=" flex items-center gap-2 flex-col md:flex-row">
            <Filter actionHandler={handleCustomersFiltering} />
            <Sort setSort={setSort} id="sort-by" label="Sort by" />
          </div>
        </div>
        <div className="hidden md:block px-5">
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
                {data.map((request) => {
                  return (
                    <tr key={request?.id} className=" border-b">
                      <td>{request?.code}</td>
                      <td>{request?.type}</td>
                      <td>
                        {formatDate(request?.start_date)} -{" "}
                        {formatDate(request?.end_date)}
                      </td>
                      <td>{request?.applicable_shortlet_count}</td>
                      <td>{request?.applicable_user_count}</td>
                      <td>{request?.validity}</td>
                      <td className=" group relative">
                        <span className=" p-2 text-lg">...</span>
                        <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              openCouponEditModal(String(request?.id));
                            }}
                            className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Edit Coupon
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              openDeletePrompt(String(request?.id));
                            }}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Delete Coupon
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
          <MobileCouponTable
            data={data}
            deleteCoupon={openDeletePrompt}
            editCoupon={openCouponEditModal}
          />
        </div>
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="Coupon Lists"
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
