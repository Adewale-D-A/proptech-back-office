import Pagination from "../pagination";
import { ReactNode, useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import AddEditAmenities from "../amenities/create-amenities";

export default function AmenitiesListsTable({
  header,
  data,
  title,
}: {
  header: string[];
  data: {
    id: number;
    amentiesName: string;
    icon: ReactNode;
    text: string;
  }[];
  title: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openEditAmenity, setOpenEditAmenity] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Sort id="room-options" label="Sort List" />{" "}
        </div>
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
                  <td>{request?.amentiesName}</td>
                  <td>{request?.icon}</td>
                  <td>{request?.text}</td>
                  <td className=" group relative">
                    <span className=" p-2 text-lg">...</span>
                    <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                      <button
                        type="button"
                        onClick={() => setOpenEditAmenity(true)}
                        className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Edit Amenity
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenDelete(true)}
                        className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                      >
                        Delete Amenity
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
        <AddEditAmenities setOpen={setOpenEditAmenity} id="1" />
      </ModalTemplate>
    </>
  );
}
