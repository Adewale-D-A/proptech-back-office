import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import useGetAllPackagesAndOffers from "../../services-hooks/useGetPackageAndOffersLists";
import { removePackageAndOfferInList } from "../../stores/apiData/packages-and-offers";
import TableSearch from "../inputs/search/table-search";
import MobileOfferTable from "./mobile/offers";
import useAxios from "../../useHooks/useAxios";

export default function PackagesAndOfferList({ header }: { header: string[] }) {
  const dispatch = useAppDispatch();
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllPackagesAndOffers({
      page: currentPage,
      search,
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
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Offer List</h2>
          <div className=" max-w-md">
            <TableSearch setValue={setSearch} placeholder="name..." />
          </div>
          {/* <div className=" flex items-center gap-2 flex-col md:flex-row"> */}
          {/* <Filter actionHandler={handleCustomersFiltering} /> */}
          {/* <Sort setSort={setSort} id="sort-by" label="Sort by" /> */}
          {/* </div>        */}
        </div>
        <div className="hidden md:block px-5">
          {data && data.length > 0 ? (
            <div className=" w-full overflow-x-auto">
              <table className=" w-full">
                <thead>
                  <tr>
                    {header.map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((request) => {
                    return (
                      <tr key={request?.id} className=" border-b">
                        <td>{request?.id}</td>
                        <td>{request?.name}</td>
                        <td>{request?.start_date}</td>
                        <td>{request?.end_date}</td>
                        <td>{request?.price}</td>
                        <td>{request?.applicable_shortlet_count}</td>
                        <td className=" group relative">
                          <span className=" p-2 text-lg">...</span>
                          <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                            <Link
                              to={`/plans-and-promotions/package-and-offer/edit-new-package-and-offer/${request?.id}`}
                              className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                            >
                              Edit Offer
                            </Link>
                            <button
                              type="button"
                              onClick={() => selectForDelete(request?.id)}
                              className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                            >
                              Delete Offer
                            </button>
                          </span>
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
        </div>
        <div className="w-full block md:hidden">
          <MobileOfferTable data={data} deleteOffer={selectForDelete} />
        </div>
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={false}
          label="offer lists"
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
