import { useCallback, useState } from "react";
import useAxiosMultipart from "../../useHooks/useAxiosMultipart";
import { useAppDispatch } from "../../stores/hooks";
import { openSnackbar } from "../../stores/appFunctionality/snackbar";
import { addRequisitionRequestToList } from "../../stores/apiData/requisition-requests";
import RequisitionRequestForm from "../../pages/requests/requisition-requests/requisition-request-form";
import {
  requisitionRequestFormMain,
  requisitionRequestFormSecondary,
} from "../../types/apiData/requisition-request";
import {
  replaceMaintenanceRequestInList,
  updateMaintenanceRequestStatusInList,
} from "../../stores/apiData/maintenance-requests";
import { useNavigate } from "react-router-dom";

export default function ConvertToRequisition({
  id,
  setOpen,
}: {
  id?: string;
  setOpen: (open: boolean) => void;
}) {
  const axios = useAxiosMultipart({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (
      payload: requisitionRequestFormMain & requisitionRequestFormSecondary
    ) => {
      try {
        const newPayload = Object.fromEntries(
          Object.entries(payload).filter(([key]) =>
            key === "is_paid" || key === "remove_images" ? false : true
          )
        );
        const response = await axios.post(
          `/admin/maintenance-request/requisition/${id}`,
          newPayload
        );
        const { requisition_request } = response?.data?.data;
        dispatch(addRequisitionRequestToList(requisition_request));
        dispatch(
          updateMaintenanceRequestStatusInList({ id, status: "approved" })
        );
        dispatch(
          openSnackbar({
            message:
              "Maintenance request successfully converted to requisition request",
            isError: false,
          })
        );
        setOpen(false);
        navigate("/requests/maintenance-requests");
      } catch (error) {}
    },
    [id]
  );

  return (
    <div className="w-full grid grid-cols-1 gap-3">
      <p className=" text-[#475467] text-sm font-medium pb-4">
        Modify the requisition details
      </p>
      <RequisitionRequestForm
        id={id}
        setOpen={setOpen}
        handleFormSubmission={handleSubmit}
        type="convert"
      />
    </div>
  );
}
