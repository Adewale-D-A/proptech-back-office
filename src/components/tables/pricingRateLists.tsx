import Pagination from "../pagination";
import { useCallback, useState } from "react";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import BinIcon from "../../assets/icons/bin-icon";
import useGetRateListByApartmentId from "../../services-hooks/pricing/useGetRateListByApartmentId";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";

export default function PriceRateList({
  apartmentId,
}: {
  apartmentId: string;
}) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, pagination, isLoading } = useGetRateListByApartmentId({
    page: currentPage,
    apartmentId: apartmentId,
  });

  const handleOpenDelete = useCallback((id: number) => {
    setSelectedId(String(id || ""));
    setOpenDelete(true);
  }, []);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/rate-list/${selectedId}`);
      dispatch(
        openSnackbar({
          message: "Rate successfully deleted",
          isError: false,
        })
      );
      setOpenDelete(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);

  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-auto">
        <table className=" w-full overflow-x-auto">
          <thead className="">
            <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
              {["S/N", "Rates Per Nights", "Standard Rates", "Action"].map(
                (head) => (
                  <th key={head}>{head}</th>
                )
              )}
            </tr>
          </thead>
          <tbody className="">
            {data.map((item, index) => {
              return (
                <tr key={item?.id} className=" border-b">
                  <td>{index + 1}</td>
                  <td>{item?.number_of_nights} Nights</td>
                  <td>{item?.price}</td>
                  <td className="">
                    <button
                      title="delete"
                      onClick={() => handleOpenDelete(item?.id)}
                    >
                      <BinIcon className=" text-red-500 h-6 w-6" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          label="rates"
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Rate"
        description="Are you sure you want to delete this rate?"
        btnTitle="Yes, I want to"
      />
    </>
  );
}
