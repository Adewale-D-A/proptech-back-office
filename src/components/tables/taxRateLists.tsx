import { useCallback, useState } from "react";
import DeleteConfirmation from "../infoModal/delete-confirmation";
import { useAppDispatch } from "../../stores/hooks";
import useGetAllTaxRateLists from "../../services-hooks/useGetTaxRatesLists";
import {
  removeTaxRateInList,
  replaceTaxRateInList,
} from "../../stores/apiData/tax-rate-lists";
import formatDate, { formatTime } from "../../utils/isoDateConverter";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import useAxios from "../../useHooks/useAxios";
import ModalTemplate from "../modal";
import AddTax from "../tax/addTax";
import useExtractUrlParams from "../../useHooks/extract-url-query-params";
import TableTemplate from "./table-template";
import { taxRates } from "../../types/apiData/taxRates";

export default function TaxRateLists({ header }: { header: string[] }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const [{ page }] = useExtractUrlParams({
    page: 1,
  });
  const { data, isLoading } = useGetAllTaxRateLists({ page });
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

  // const { data: tax } = useGetResourceAccessChecker({
  //   resource: "tax",
  // });
  return (
    <>
      <div className="w-full rounded-lg border md:p-5 flex flex-col gap-5 ">
        <div className=" w-full justify-between gap-6 flex items-center flex-col lg:flex-row">
          <h2 className="text-xl font-semibold">Tax List</h2>
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
          columns={[
            {
              header: "S/N",
              key: "sn",
              render: (row: taxRates, index) => <span> {index || 0 + 1}</span>,
            },
            {
              header: "Tax Name",
              key: "tax_name",
              showColumnSort: false,
              render: (row: taxRates) => <span>{row?.name}</span>,
            },
            {
              header: "Tax Rate",
              key: "tax_rate",
              render: (row: taxRates) => <span>{row?.rate}</span>,
            },

            {
              header: "Created On",
              key: "created_on",
              showColumnSort: false,
              render: (row: taxRates) => (
                <span>
                  {formatDate(row?.created_at)} {formatTime(row?.created_at)}
                </span>
              ),
            },
            {
              header: "Tax Breakdown",
              key: "tax_breakdown",
              render: (row: taxRates) => <span></span>,
            },
          ]}
          showPaginator={false}
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
