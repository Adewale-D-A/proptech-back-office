import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import AddEditAmenities from "../amenities/create-amenities";
import useGetAmenities from "../../services-hooks/useGetAmenities";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { removeAmenity } from "../../stores/apiData/amenities";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import TableActionDropDown from "../drop-down/table-action-dropdown";
import { MenuItem } from "@headlessui/react";
import RenderIcon from "../icon-picker/render-icon";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { amenity } from "../../types/apiData/amenities";

export default function AmenitiesListsTable() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();

  const [{ page, size, sort }] = useExtractUrlParams({
    page: 1,
    size: 20,
    sort: "asc",
  });
  const { data, isLoading, pagination } = useGetAmenities({
    page,
    sort,
    limit: size,
  });

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

        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "Amenities Name",
              key: "name",
              showColumnSort: true,
              render: (row: amenity) => <span>{row?.name}</span>,
            },
            {
              header: "Icon",
              key: "icon",
              render: (row: amenity) => <RenderIcon value={row?.image} />,
            },
            {
              header: "Text",
              key: "text",
              showColumnSort: true,
              render: (row: amenity) => <span>{row?.description}</span>,
            },
            {
              header: "Action",
              key: "action",
              render: (row: amenity) => (
                <TableActionDropDown>
                  <>
                    {amenity?.update && (
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(row?.id));
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
                            setSelectedId(String(row?.id));
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
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
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
        className=""
      >
        <AddEditAmenities setOpen={setOpenEditAmenity} id={selectedId} />
      </ModalTemplate>
    </>
  );
}
