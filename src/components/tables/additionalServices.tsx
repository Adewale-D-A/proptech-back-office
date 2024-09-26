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

export default function AdditionalServiceListTable({
  header,
}: {
  header: string[];
}) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllAdditionalServiceLists({ page: currentPage });
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
              {data.map((request) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td>{request?.customerName}</td>
                    <td>{request?.apartmentName}</td>
                    <td>{request?.requestDate}</td>
                    <td>{request?.serviceType}</td>
                    <td>{request?.description}</td>
                    <td>{request?.escalateStatus}</td>
                    <td>
                      <Status status={request?.status} />
                    </td>
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <Link
                          to={`/additional-services/service-details/${request?.id}`}
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
                            setDeleteId(request?.id);
                            setOpenDeleteConfirmation(true);
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
          label="Requests"
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
