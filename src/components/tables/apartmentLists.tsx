import { Link, useLocation } from "react-router-dom";
import { useCallback, useState } from "react";
import Status from "../status";
import LocationPinIcon from "../../assets/icons/location";
import Sort from "../filterAndSort/sort";
import useGetAllApartmentLists from "../../services-hooks/useGetAllApartmentLists";
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
import RenderIcon from "../icon-picker/render-icon";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { apartment, apartmentById } from "../../types/apiData/apartment";

export default function ApartmentListsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const location = useLocation();
  // const [search, setSearch] = useState("");

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("1");
  const [openRate, setOpenRate] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [{ search, page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    search: "",
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetAllApartmentLists({
    page,
    limit: size,
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
            <TableSearch placeholder="Apartment name, type, location..." />
          </div>
          <Sort id="sort-by" label="Sort by" />
          <ExportToCSV
            dataset={data}
            jsonToCSVReformerter={apartmentExportFormater}
            fileName="apartment-list"
          />
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Apartment Name",
              key: "name",
              showColumnSort: true,
              render: (row: apartment) => (
                <div className=" flex gap-2 items-center min-w-36">
                  <img
                    src={"/logo_blue.png"}
                    alt={row?.name}
                    className=" h-7 w-7 rounded aspect-square"
                  />
                  <span className=" flex flex-col gap-1 text-sm">
                    <span>{row?.name}</span>
                    <span className=" text-xs text-gray-500 flex items-center gap-1">
                      <LocationPinIcon className=" h-3 w-3" />
                      {row?.location}
                    </span>
                  </span>
                </div>
              ),
            },
            {
              header: "No of Guests",
              key: "no_guests",
              showColumnSort: true,
              render: (row: apartment) => <span>{row?.max_guests} Guests</span>,
            },
            {
              header: "Category",
              key: "category",
              showColumnSort: true,
              render: (row: apartmentById) => (
                <span>{row?.room_option?.name}</span>
              ),
            },
            {
              header: "Characteristics",
              key: "characteristics",
              render: (row: apartmentById) => (
                <div className=" flex items-center flex-wrap gap-2">
                  {row?.amenities?.map((item) => (
                    <span key={item?.id} className=" flex items-center gap-2">
                      <RenderIcon
                        value={item?.image}
                        className=" w-4 h-4 text-gray-400"
                      />{" "}
                      {item?.name},
                    </span>
                  ))}
                </div>
              ),
            },
            {
              header: "Status",
              key: "status",
              showColumnSort: true,
              render: (row: apartment) => (
                <Status status={row?.availability_status} />
              ),
            },
            {
              header: "Action",
              key: "action",
              render: (row: apartment) => (
                <TableActionDropDown>
                  <>
                    <MenuItem>
                      <Link
                        to={`/apartments/apartment-details/${row?.id}`}
                        className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Apartment
                      </Link>
                    </MenuItem>
                    {shortlet?.update && (
                      <MenuItem>
                        <Link
                          to={`/apartments/edit-apartment/apartment-details/${row?.id}?redirect=${location?.pathname}&action=rewrite`}
                          className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Apartment
                        </Link>
                      </MenuItem>
                    )}
                    {calendar?.view && (
                      <MenuItem>
                        <Link
                          to={`/apartments/apartment-caledar/${row?.id}?apt_id=${row?.id}`}
                          className="w-full p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Check Calender
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem>
                      <button
                        type="button"
                        onClick={() => handleOpenCalculateRate(row?.id)}
                        className="w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        View Rate
                      </button>
                    </MenuItem>
                  </>
                </TableActionDropDown>
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
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
