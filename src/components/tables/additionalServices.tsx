import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import NoResult from "../noResult";
import Search from "../inputs/search";
import FilterSearch from "../filterAndSort/filter-search";
import useGetAllAdditionalServiceLists from "../../services-hooks/useGetAllAdditionalServiceLists";
import Status from "../status";
import { useAppDispatch } from "../../stores/hooks";
import { removeAdditionalServicesInList } from "../../stores/apiData/additional-services-lists";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import MobileAdditionalServicesTable from "./mobile/additionalServises";
import formatDate from "../../utils/isoDateConverter";

export default function AdditionalServiceListTable({
  header,
}: {
  header: string[];
}) {
  const dispatch = useAppDispatch();

  const [filterDates, setFilterDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllAdditionalServiceLists({
      page: currentPage,
      start_date: filterDates?.start_date,
      end_date: filterDates?.end_date,
      sort: sort,
    });

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("1");

  const deleteApartment = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removeAdditionalServicesInList({ id: deleteId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [deleteId]);

  const deleteModal = useCallback((id: number) => {
    setDeleteId(String(id));
    setOpenDeleteConfirmation(true);
  }, []);

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
        <div className="hidden md:block px-5">
          {data && data.length > 0 ? (
            <table className=" w-full text-xs  overflow-x-auto">
              <thead className="">
                <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                  {header.map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {data?.map((item) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td>***</td>
                      <td>{item?.booking?.shortlet?.name}</td>
                      <td>{formatDate(item?.created_at)}</td>
                      <td>{item?.service_type?.name}</td>
                      <td>{item?.description}</td>
                      <td>***</td>
                      <td>
                        <Status status={item?.status} />
                      </td>
                      <td className=" group relative">
                        <span className=" p-2 text-lg">...</span>
                        <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                          <Link
                            to={`/additional-services/service-details/${item?.id}`}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            View Details
                          </Link>
                          <Link
                            to={`#`}
                            className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Mark As Resolved
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              deleteModal(item?.id);
                            }}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Delete Service
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
          <MobileAdditionalServicesTable
            data={data}
            deleteFunction={deleteModal}
          />
        </div>
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="items"
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
