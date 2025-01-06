import { useCallback, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import Timeline from "../../../components/timeline";
import UsersIcon from "../../../assets/icons/users";
import EditCustomerSalesChannel from "../../../components/add-edit-customer/customer-sales-channel";
import { replaceCustomersInList } from "../../../stores/apiData/customers-lists";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import { customerRequestPayload } from "../../../types/apiData/customers/request-payload";
import useAxiosMultipart from "../../../useHooks/useAxiosMultipart";
const breadCrumb = [
  {
    url: "/customers",
    label: "Customers",
    icon: <UsersIcon />,
  },
  {
    url: "#",
    label: "Edit Customer Sales Channel",
    icon: "",
  },
];

export default function EditCustomerSalesChannelPage() {
  const { id } = useParams();
  const axios = useAxiosMultipart(false);
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Edit Customer Sales Channel",
        pageDescription: "Edit customer's sales channel",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = useCallback(
    async (payload: customerRequestPayload) => {
      const populatedPayload = {
        ...payload,
        profile_photo: payload?.profile_photo?.id ? "" : payload?.profile_photo,
        identity_document: payload?.identity_document?.id
          ? ""
          : payload?.identity_document,
      } as {
        [key: string]: any;
      };
      const newPayload = Object.fromEntries(
        Object.entries(populatedPayload).filter(([key]) =>
          populatedPayload[key] === "" || populatedPayload[key] === null
            ? false
            : true
        )
      );
      try {
        setIsSubmitting(true);
        const response = await axios.post(`/admin/user/${id}`, newPayload);
        const data = response?.data?.data;
        dispatch(
          openSnackbar({
            message: "Customer's information successfully updated",
            isError: false,
          })
        );
        dispatch(replaceCustomersInList(data));
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [id]
  );

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-screen-lg justify-center py-10">
            <Timeline currentStep={4} id="customer" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <EditCustomerSalesChannel
              id={id}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
