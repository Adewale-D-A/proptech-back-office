import { useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import UsersIcon from "../../../assets/icons/users";
import AddCustomerDetails from "../../../components/add-edit-customer/customer-details";
import Timeline from "../../../components/timeline";

export default function AddNewCustomerDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const breadCrumb = useMemo(
    () => [
      {
        url: "/customers",
        label: "Customers",
        icon: <UsersIcon />,
      },
      {
        url: "#",
        label: "New Customer Details",
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
        pageTitle: "Add New Customer Details",
        pageDescription: "Add a new customer's details",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  // useEffect(() => {
  //   if (!(storeCustomerDetails?.id === "updated")) {
  //     dispatch(clearAllCustomerInfo());
  //   }
  // }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-screen-lg justify-center py-10">
            <Timeline currentStep={1} id="customer" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <AddCustomerDetails />
          </div>
        </div>
      </div>
    </section>
  );
}
