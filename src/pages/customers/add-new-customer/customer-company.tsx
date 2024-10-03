import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import Timeline from "../../../components/timeline";
import UsersIcon from "../../../assets/icons/users";
import { clearAllCustomerInfo } from "../../../stores/inAppDataInterations/addEditCustomerInfo";
import AddCustomerFinalStep from "../../../components/add-edit-customer/customer-final-step";

const breadCrumb = [
  {
    url: "/customers",
    label: "Customers",
    icon: <UsersIcon />,
  },
  {
    url: "#",
    label: "New Customer Company",
    icon: "",
  },
];
export default function AddNewCustomerCompany() {
  const dispatch = useAppDispatch();
  const storeCustomerDetails = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Add New Customer Company",
        pageDescription: "Add a new customer's company",
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
            <Timeline currentStep={3} id="customer" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <AddCustomerFinalStep />
          </div>
        </div>
      </div>
    </section>
  );
}
