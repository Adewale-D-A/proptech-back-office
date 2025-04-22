import { Link, useLocation } from "react-router-dom";
import { useCallback, useState } from "react";
import Status from "../status";
import LocationPinIcon from "../../assets/icons/location";
import Pagination from "../pagination";
import Sort from "../filterAndSort/sort";
import useGetAllApartmentLists from "../../services-hooks/useGetAllApartmentLists";
import NoResult from "../noResult";
import { useAppDispatch } from "../../stores/hooks";
import { removeApartmentInList } from "../../stores/apiData/apartment-lists";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import TableSearch from "../inputs/search/table-search";
import ReceiptIcon from "../../assets/icons/receipt";
import ModalTemplate from "../modal";
import CalculateRate from "../check-availability/calculate-rate";
import useAxios from "../../useHooks/useAxios";
import ExportToCSV from "../export-to-csv";
import { apartmentExportFormater } from "../../utils/export-formerter-functions";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function ApartmentListsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("1");
  const [openRate, setOpenRate] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { data, isLoading, pagination } = useGetAllApartmentLists({
    page: currentPage,
    search,
    sort,
  });

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

  const { data: shortlet } = useGetResourceAccessChecker({
    resource: "shortlet",
  });
  const { data: calendar } = useGetResourceAccessChecker({
    resource: "view-calendar",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Apartment List</h2>
          <div className=" max-w-md">
            <TableSearch
              setValue={setSearch}
              placeholder="Apartment name, type, location..."
            />
          </div>
          <Sort setSort={setSort} id="sort-by" label="Sort by" />
          <ExportToCSV
            dataset={data}
            jsonToCSVReformerter={apartmentExportFormater}
            fileName="apartment-list"
          />
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {[
                    "Apartment Name",
                    "No of Guests",
                    "Category",
                    "Characteristics",
                    // "Units",
                    "Status",
                    "Action",
                  ].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((request) => {
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
                      <td>{request?.max_guests} Guests</td>
                      <td>{request?.room_option?.name}</td>
                      <td>
                        <div className=" flex items-center flex-wrap gap-2">
                          {request?.amenities?.map((item) => (
                            <span key={item?.id}>{item?.name},</span>
                          ))}
                        </div>
                      </td>
                      {/* <td>**</td> */}
                      <td>
                        <Status status={request?.availability_status} />
                      </td>
                      <td className=" text-left">
                        <TableActionDropDown>
                          <>
                            <MenuItem>
                              <Link
                                to={`/apartments/apartment-details/${request?.id}`}
                                className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                              >
                                View Apartment
                              </Link>
                            </MenuItem>
                            {shortlet?.update && (
                              <MenuItem>
                                <Link
                                  to={`/apartments/edit-apartment/apartment-details/${request?.id}?redirect=${location?.pathname}&action=rewrite`}
                                  className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Edit Apartment
                                </Link>
                              </MenuItem>
                            )}
                            {calendar?.view && (
                              <MenuItem>
                                <Link
                                  to={`/apartments/apartment-caledar/${request?.id}`}
                                  className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Check Calender
                                </Link>
                              </MenuItem>
                            )}
                            <MenuItem>
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenCalculateRate(request?.id)
                                }
                                className="w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                              >
                                View Rate
                              </button>
                            </MenuItem>
                          </>
                        </TableActionDropDown>
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
        {/* <div className="w-full block md:hidden">
          <MobileApartmentTable
            data={data}
            handleOpenCalculateRate={handleOpenCalculateRate}
          />
        </div> */}
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
        className=" max-w-lg w-full"
      >
        <CalculateRate apartmentId={selectedId} setIsOpen={setOpenRate} />
      </ModalTemplate>
    </>
  );
}
