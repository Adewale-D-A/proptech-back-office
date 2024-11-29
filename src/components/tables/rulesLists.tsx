import Pagination from "../pagination";
import { useCallback, useState } from "react";
import Sort from "../filterAndSort/sort";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import ModalTemplate from "../modal";
import AddEdit from "../amenities/addEdit";
import useGetHouseRules from "../../services-hooks/useGetAllRules";
import NoResult from "../noResult";

export default function RulesLists({
  header,
  title,
}: {
  header: string[];
  title: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetHouseRules({ page: currentPage });
  const [selectedId, setSelectedId] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [editRule, setEditRule] = useState(false);
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
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Sort id="extra-options" label="Sort List" />{" "}
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
                    <td>{request?.name}</td>
                    <td>***</td>
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(request?.id));
                            setEditRule(true);
                          }}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setOpenDelete(true)}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete
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
          isLoading={isLoading}
          label="Rules"
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        isLoading={isDeleting}
        confirmationHandler={handleDelete}
        title="Delete Rule"
        description="Are you sure you want to delete this rule?"
        btnTitle="Yes, I want to"
      />
      <ModalTemplate
        open={editRule}
        setOpen={setEditRule}
        showXicon={true}
        title="Edit"
        className=" max-w-md"
      >
        <AddEdit setOpen={setEditRule} id={selectedId} componentId="rule" />
      </ModalTemplate>
    </>
  );
}
