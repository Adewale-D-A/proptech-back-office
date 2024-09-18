import Pagination from "../pagination";
import { useCallback, useState } from "react";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import BinIcon from "../../assets/icons/bin-icon";

export default function PriceRateList({
  header,
  data,
}: {
  header: string[];
  data: {
    id: number;
    nights: number;
    standardRate: string;
  }[];
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 overflow-auto">
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
                  <td>{index + 1}</td>
                  <td>{request?.nights} Nights</td>
                  <td>{request?.standardRate}</td>
                  <td className="">
                    <button title="delete" onClick={() => setOpenDelete(true)}>
                      <BinIcon className=" text-red-500 h-6 w-6" />
                    </button>
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
