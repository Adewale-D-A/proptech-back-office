import { useLocation, useParams } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import UsersIcon from "../../assets/icons/users";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import ExportSelect from "../../components/inputs/select/exportSelect";
import LinkButton from "../../components/button/linkButton";
import PlusIcon from "../../assets/icons/plus";
import CustomersListTable from "../../components/tables/customer";
import { clearAllCustomerInfo } from "../../stores/inAppDataInterations/addEditCustomerInfo";

const breadCrumb = [
  {
    url: "#",
    label: "Customers",
    icon: <UsersIcon />,
  },
];
export default function Customers() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Customers",
        pageDescription: "Customers",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  // clear customer info fields
  useEffect(() => {
    dispatch(clearAllCustomerInfo());
  }, []);

  return (
    <section className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" w-full flex justify-between">
          <h2 className="text-xl font-semibold">Customers</h2>
          <div className=" flex items-center gap-4">
            <ExportSelect id="customers" />
            <LinkButton
              url={`/add-customer/customer-details?redirect=${location?.pathname}`}
              label="Add New Customer"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>
        <div>
          <CustomersListTable
            header={[
              "ID",
              "First Name",
              "Last Name",
              "Phone Number",
              "Country",
              "Total Booking",
              "Action",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
