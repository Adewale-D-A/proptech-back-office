import { useEffect, useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import UsersIcon from "../../../assets/icons/users";
import { clearAllCustomerInfo } from "../../../stores/inAppDataInterations/addEditCustomerInfo";
import EditCustomerDetails from "../../../components/add-edit-customer/customer-details";
import Timeline from "../../../components/timeline";
import useGetCustomerById from "../../../services-hooks/useGetCustomerById";

const breadCrumb = [
  {
    url: "/customers",
    label: "Customers",
    icon: <UsersIcon />,
  },
  {
    url: "#",
    label: "Edit Customer Details",
    icon: "",
  },
];

export default function EditCustomerDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const storeCustomerDetails = useAppSelector(
    (state) => state.addEditCustomerInfo.value.data
  );

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Edit Customer Details",
        pageDescription: "Edit a customer's details",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const customer = useGetCustomerById(
    storeCustomerDetails?.id === "updated" ? undefined : id
  );

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-screen-lg justify-center py-10">
            <Timeline currentStep={1} id="customer" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <EditCustomerDetails id={id} />
          </div>
        </div>
      </div>
    </section>
  );
}
