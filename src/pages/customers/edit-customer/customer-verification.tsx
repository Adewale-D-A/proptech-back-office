import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import Timeline from "../../../components/timeline";
import UsersIcon from "../../../assets/icons/users";
import EditCustomerVerification from "../../../components/add-edit-customer/customer-verification";

const breadCrumb = [
  {
    url: "/customers",
    label: "Customers",
    icon: <UsersIcon />,
  },
  {
    url: "#",
    label: "Edit Customer Verification",
    icon: "",
  },
];
export default function EditCustomerVerifiationPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Edit Customer Verification",
        pageDescription: "Edit a customer's verification",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full rounded-md border flex flex-col items-center justify-center">
          <div className=" w-full flex items-center max-w-screen-lg justify-center py-10">
            <Timeline currentStep={2} id="customer" />
          </div>
          <div className="w-full border-t py-10 px-5">
            <EditCustomerVerification id={id} />
          </div>
        </div>
      </div>
    </section>
  );
}
