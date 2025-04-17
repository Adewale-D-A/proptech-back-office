import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import AddEditAmenities from "../amenities/create-amenities";
import NoResult from "../noResult";
import useGetAmenities from "../../services-hooks/useGetAmenities";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeAmenity } from "../../stores/apiData/amenities";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";

export default function AmenitiesListsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAmenities({ page: currentPage });

  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openEditAmenity, setOpenEditAmenity] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/amenity/${selectedId}`);
      dispatch(removeAmenity({ id: Number(selectedId) }));
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  const { data: amenity } = useGetResourceAccessChecker({
    resource: "amenity",
  });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Amenities List</h2>
          <Sort id="room-options" label="Sort List" />{" "}
        </div>
        {data && data.length > 0 ? (
          <div className=" w-full overflow-x-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  {["Amenities Name", "Icon", "Text", "Action"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item?.id} className=" border-b">
                      <td>{item?.name}</td>
                      <td>
                        <img
                          src={item?.image}
                          alt={item?.name}
                          title={item?.name}
                          className=" w-10 h-auto"
                        />
                      </td>
                      <td>{item?.description}</td>
                      <td>
                        <TableActionDropDown>
                          <>
                            {amenity?.update && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedId(String(item?.id));
                                    setOpenEditAmenity(true);
                                  }}
                                  className=" w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Edit Amenity
                                </button>
                              </MenuItem>
                            )}
                            {amenity?.delete && (
                              <MenuItem>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedId(String(item?.id));
                                    setOpenDelete(true);
                                  }}
                                  className="w-full text-left p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                                >
                                  Delete Amenity
                                </button>
                              </MenuItem>
                            )}
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
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="Amenities"
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Amenity"
        description="Are you sure you want to delete this amenity?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={openEditAmenity}
        setOpen={setOpenEditAmenity}
        showXicon={true}
        title="Edit Amenity"
        className=" max-w-md"
      >
        <AddEditAmenities setOpen={setOpenEditAmenity} id={selectedId} />
      </ModalTemplate>
    </>
  );
}
