import { useEffect, useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import Timeline from "../../../components/timeline";
import UsersIcon from "../../../assets/icons/users";
import { clearAllCustomerInfo } from "../../../stores/inAppDataInterations/addEditCustomerInfo";
import AddCustomerSalesChannel from "../../../components/add-edit-customer/customer-sales-channel";

export default function AddNewCustomerSalesChannel() {
  const { id } = useParams();
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

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-screen-lg justify-center py-10">
            <Timeline currentStep={4} id="customer" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <AddCustomerSalesChannel />
          </div>
        </div>
      </div>
    </section>
  );
}
