import { useCallback, useState } from "react";
import Pagination from "../pagination";
import NoResult from "../noResult";
import Search from "../inputs/search";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import useGetAllTaxRateLists from "../../services-hooks/useGetTaxRatesLists";
import {
  removeTaxRateInList,
  replaceTaxRateInList,
} from "../../stores/apiData/tax-rate-lists";
import Filter from "../filterAndSort/filter";
import Sort from "../filterAndSort/sort";
import formatDate, { formatTime } from "../../utils/isoDateConverter";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useAxios from "../../useHooks/useAxios";
import ModalTemplate from "../modal";
import AddTax from "../tax/addTax";

export default function TaxRateLists({ header }: { header: string[] }) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFailed, setIsFailed, retryFunction, pagination } =
    useGetAllTaxRateLists({ page: currentPage });
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState("1");

  // tax rates
  const [openTaxUpdate, setOpenTaxUpdate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // tax rates submission
  const updateTaxService = useCallback(
    async (item: {
      id: string;
      name: string;
      amount: string;
      isCompound: boolean;
      cap: string;
    }) => {
      setIsSubmitting(true);
      try {
        const response = await axios.post(`/admin/tax/${selectedId}`, {
          name: item?.name,
          rate: Number(item?.amount),
        });
        const result = response?.data?.data;
        console.log({ result });
        dispatch(
          openSnackbar({
            message: "Tax successfully updated",
            isError: false,
          })
        );
        dispatch(
          replaceTaxRateInList({
            id: result?.id,
            name: result?.name,
            rate: result?.rate,
            created_at: result?.created_at,
            breakdown: item?.cap,
          })
        );
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedId]
  );

  const deleteApartment = useCallback(() => {
    setIsDeleting(true);
    try {
      dispatch(removeTaxRateInList({ id: selectedId }));
      setOpenDeleteConfirmation(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId]);
  return (
    <>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Tax List</h2>

          <Search
            placeholder="Invoice number, booking Id..."
            id="tax-rate-search"
          />
          <Filter />
          <Sort id="sort-tax-rate" label="Sort by" />
        </div>
        {data && data.length > 0 ? (
          <table className=" w-full text-xs overflow-x-auto">
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
                    <td>{request?.name}</td>
                    <td>{request?.rate}</td>
                    <td>
                      {formatDate(request?.created_at)}{" "}
                      {formatTime(request?.created_at)}
                    </td>
                    <td>***</td>
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(request?.id));
                            setOpenTaxUpdate(true);
                          }}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Tax
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(String(request?.id));
                            setOpenDeleteConfirmation(true);
                          }}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Tax Rate
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
          label="Tax"
        />
      </div>
      <DeleteConfirmation
        confirmationHandler={deleteApartment}
        isLoading={isDeleting}
        btnTitle="Yes, I want to"
        title="Delete Tax Rate"
        description="Are you sure you want to delete this tax rate"
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
      />
      {/* tax rate */}
      <ModalTemplate
        open={openTaxUpdate}
        setOpen={setOpenTaxUpdate}
        showXicon={true}
        title="Update Tax Rate"
        className=" max-w-md"
      >
        <AddTax
          id={selectedId}
          setOpen={setOpenTaxUpdate}
          submitHandler={updateTaxService}
          isSubmitting={isSubmitting}
          componentId="tax-rate"
        />
      </ModalTemplate>
    </>
  );
}
