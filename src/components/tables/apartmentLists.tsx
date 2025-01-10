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
import TableSearch from "../inputs/search/table-search";
import MobileApartmentTable from "./mobile/apartment";
import ReceiptIcon from "../../assets/icons/receipt";
import ModalTemplate from "../modal";
import CalculateRate from "../check-availability/calculate-rate";
import useAxios from "../../useHooks/useAxios";

export default function ApartmentListsTable() {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("1");
  const [openRate, setOpenRate] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllApartmentLists({ page: currentPage, search });

  const handleOpenCalculateRate = useCallback((id: number) => {
    setSelectedId(String(id || ""));
    setOpenRate(true);
  }, []);

  const deleteApartment = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/shortlet/${deleteId}`);
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
          <h2 className="text-xl font-semibold">Apartment List</h2>
          <div className=" max-w-md">
            <TableSearch
              setValue={setSearch}
              placeholder="Apartment name, type, location..."
            />
          </div>
          <Sort id="apartment-lists" label="Sort Category" />{" "}
        </div>
        <div className="hidden md:block px-5">
          {data && data.length > 0 ? (
            <table className=" w-full overflow-x-auto">
              <thead className="">
                <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                  {[
                    "Apartment Name",
                    "No of Guests",
                    "Category",
                    "Characteristics",
                    "Units",
                    "Status",
                    "Action",
                  ].map((head) => (
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
                      <td className=" text-lg  min-w-36">
                        {request?.max_guests} Guests
                      </td>
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
                            to={`/apartments/apartment-details/${request?.id}`}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            View Apartment
                          </Link>
                          <Link
                            to={`/apartments/edit-apartment/apartment-details/${request?.id}`}
                            className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Edit Apartment
                          </Link>
                          <Link
                            to={`/apartments/apartment-caledar/${request?.id}`}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Check Calender
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleOpenCalculateRate(request?.id)}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            View Rate
                          </button>
                          {/* <button
                            type="button"
                            onClick={() => {
                              setDeleteId(String(request?.id));
                              setOpenDeleteConfirmation(true);
                            }}
                            className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                          >
                            Delete Apartment
                          </button> */}
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
          <MobileApartmentTable
            data={data}
            handleOpenCalculateRate={handleOpenCalculateRate}
          />
        </div>
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
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
      {/*check availability */}
      <ModalTemplate
        open={openRate}
        setOpen={setOpenRate}
        showXicon={true}
        titleIcon={<ReceiptIcon />}
        title="Calculate rate"
        className=" max-w-md"
      >
        <div className="w-full">
          <CalculateRate apartmentId={selectedId} setIsOpen={setOpenRate} />
        </div>
      </ModalTemplate>
    </>
  );
}
