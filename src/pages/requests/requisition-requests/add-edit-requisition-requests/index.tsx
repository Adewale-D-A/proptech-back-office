import { useCallback, useState } from "react";
import {
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
}: {
  id?: string;
  setOpen: (open: boolean) => void;
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
        console.log({ payload });
        if (id) {
          const response = await axiosMultipart.post(
            `/admin/requisition-request/update/${id}`,
            payload
          );
          const { requisition_request } = response?.data?.data;
          dispatch(replaceRequisitionRequestInList(requisition_request));
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
          console.log({ requisition_request });
          dispatch(addRequisitionRequestToList(requisition_request));
          dispatch(
            openSnackbar({
              message: "Requisition request successfully created",
              isError: false,
            })
          );
        }
        // setOpen(false);
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [id]
  );

  return (
    <div className=" w-full">
      <RequisitionRequestForm
        id={id}
        setOpen={setOpen}
        handleFormSubmission={handleSubmit}
        submitting={isSubmitting}
      />
    </div>
  );
}
