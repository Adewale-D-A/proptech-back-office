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
  const axios = useAxios();
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
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 ">
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
          ) : (
            <NoResult />
          )}
        </div>
        <div className="w-full block md:hidden">
          <MobileOfferTable data={data} deleteOffer={selectForDelete} />
        </div>
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
          label="Offer Lists"
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
