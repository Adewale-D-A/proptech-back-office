import { useCallback, useState } from "react";
import {
  requisitionRequest,
  requisitionRequestFormMain,
  requisitionRequestFormSecondary,
} from "../../../../types/apiData/requisition-request";
import useAxiosMultipart from "../../../../useHooks/useAxiosMultipart";
import { useAppDispatch } from "../../../../stores/hooks";
import {
  addRequisitionRequestToList,
  replaceRequisitionRequestInList,
} from "../../../../stores/apiData/requisition-requests";
import { openSnackbar } from "../../../../stores/appFunctionality/snackbar";
import RequisitionRequestForm from "../requisition-request-form";

export default function AddEditRequisitionRequest({
  id,
  setOpen,
  requisitionItem,
  refetch,
}: {
  id?: string;
  setOpen: (open: boolean) => void;
  requisitionItem: requisitionRequest;
  refetch?: (val?: boolean) => void;
}) {
  const axiosMultipart = useAxiosMultipart({});
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = useCallback(
    async (
      payload: requisitionRequestFormMain & requisitionRequestFormSecondary
    ) => {
      try {
        setIsSubmitting(true);
        if (id) {
          const response = await axiosMultipart.post(
            `/admin/requisition-request/update/${id}`,
            payload
          );
          const { requisition_request } = response?.data?.data;
          dispatch(
            replaceRequisitionRequestInList({
              ...requisition_request,
              admin: {
                id: requisition_request?.admin_id,
                first_name: requisitionItem?.admin?.first_name,
                last_name: requisitionItem?.admin?.last_name,
              },
              shortlet: {
                id: requisition_request?.shortlet_id,
                name: requisitionItem?.shortlet?.name,
              },
            })
          );
          dispatch(
            openSnackbar({
              message: "Requisition request successfully updated",
              isError: false,
            })
          );
        } else {
          const response = await axiosMultipart.post(
            `/admin/requisition-request`,
            payload
          );
          const { requisition_request } = response?.data?.data;
          dispatch(
            addRequisitionRequestToList({
              ...requisition_request,
              admin: {
                id: requisition_request?.admin_id,
                first_name: "",
                last_name: "",
              },
              shortlet: {
                id: requisition_request?.shortlet_id,
                name: "",
              },
              status: "pending",
            })
          );
          dispatch(
            openSnackbar({
              message: "Requisition request successfully created",
              isError: false,
            })
          );
        }
        // setOpen(false);
        refetch?.(true);
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, requisitionItem, refetch]
  );

  return (
    <div className=" w-full">
      <RequisitionRequestForm
        requisition_id={id}
        setOpen={setOpen}
        handleFormSubmission={handleSubmit}
        submitting={isSubmitting}
      />
    </div>
  );
}
