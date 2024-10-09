import { Link } from "react-router-dom";
import Status from "../status";
import LocationPinIcon from "../../assets/icons/location";
import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Search from "../inputs/search";
import Sort from "../filterAndSort/sort";
import useGetAllApartmentLists from "../../services-hooks/useGetAllApartmentLists";
import NoResult from "../noResult";
import { useAppDispatch } from "../../stores/hooks";
import { removeApartmentInList } from "../../stores/apiData/apartment-lists";
import DeleteConfirmation from "../infoModal/delete-confirmation";

export default function ApartmentListsTable({
  header,
  // data,
  title,
}: {
  header: string[];
  // data: {
  //   id: number;
  //   apartmentInfo: {
  //     name: string;
  //     image: string;
  //     location: string;
  //   };
  //   noOfGuests: string;
  //   category: string;
  //   characteristics: string;
  //   units: string;
  //   status: string;
  // }[];
  title: string;
}) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllApartmentLists({ page: currentPage });
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("1");

  const deleteApartment = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removeApartmentInList({ id: deleteId }));
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
          <h2 className="text-xl font-semibold">{title}</h2>
          <Search
            placeholder="Apartment name, type, location..."
            id="apartment-search"
          />
          <Sort id="apartment-lists" label="Sort Category" />{" "}
        </div>
        {data && data.length > 0 ? (
          <table className=" w-full overflow-x-auto">
            <thead className="">
              <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                {header.map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {data.map((request, index) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td className=" flex gap-2 items-center min-w-36">
                      <img
                        src={"/logo_blue.png"}
                        alt={request?.name}
                        className=" h-10 w-10 rounded aspect-square"
                      />
                      <span className=" flex flex-col gap-1">
                        <span>{request?.name}</span>
                        <span className=" text-xs text-gray-500 flex items-center gap-1">
                          <LocationPinIcon className=" h-3 w-3" />
                          {request?.location}
                        </span>
                      </span>
                    </td>
                    <td className=" text-lg  min-w-36">** Guests</td>
                    <td>**</td>
                    <td>**</td>
                    <td>**</td>
                    <td>
                      <Status status={request?.availability_status} />
                    </td>
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <Link
                          to={`/apartments-details/${request?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          View Apartment
                        </Link>
                        <Link
                          to={`/edit-apartment/apartment-details/${request?.id}`}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Apartment
                        </Link>
                        <Link
                          to={`/apartment-caledar/${request?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Check Calender
                        </Link>
                        <Link
                          to="#"
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          View Rates
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteId(String(request?.id));
                            setOpenDeleteConfirmation(true);
                          }}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Apartment
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
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={false}
          label="Apartment"
        />
        <DeleteConfirmation
          confirmationHandler={deleteApartment}
          isLoading={isDeleting}
          btnTitle="Yes, I want to"
          title="Delete Apartment"
          description="Are you sure you want to delete this apartment"
          open={openDeleteConfirmation}
          setOpen={setOpenDeleteConfirmation}
        />
      </div>
    </>
  );
}
