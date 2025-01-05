import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import Timeline from "../../../components/timeline";
import UsersIcon from "../../../assets/icons/users";
import { clearAllCustomerInfo } from "../../../stores/inAppDataInterations/addEditCustomerInfo";
import AddCustomerSalesChannel from "../../../components/add-edit-customer/customer-sales-channel";
import { openSnackbar } from "../../../stores/appFunctionality/snackbar";
import { addCustomersToList } from "../../../stores/apiData/customers-lists";
import { customerRequestPayload } from "../../../types/apiData/customers/request-payload";
import useAxiosMultipart from "../../../useHooks/useAxiosMultipart";

export default function AddNewCustomerSalesChannel() {
  const { id } = useParams();
  const axios = useAxiosMultipart(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storeCustomerDetails = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data
  );
  const breadCrumb = useMemo(
    () => [
      {
        url: "/customers",
        label: "Customers",
        icon: <UsersIcon />,
      },
      {
        url: "#",
        label: "New Customer Sales Channel",
        icon: "",
      },
    ],
    [id]
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Add New Customer Sales Channel",
        pageDescription: "Add a new customer's sales channel",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  useEffect(() => {
    if (!(storeCustomerDetails?.id === "updated")) {
      dispatch(clearAllCustomerInfo());
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = useCallback(async (payload: customerRequestPayload) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`/admin/user`, payload);
      const data = response?.data?.data;
      dispatch(
        openSnackbar({
          message: "Customer information successfully created",
          isError: false,
        })
      );
      dispatch(addCustomersToList(data));
      dispatch(clearAllCustomerInfo());
      navigate(`/customers`);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-screen-lg justify-center py-10">
            <Timeline currentStep={4} id="customer" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <AddCustomerSalesChannel
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
