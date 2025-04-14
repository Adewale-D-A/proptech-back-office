// import { useLocation, useParams } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import { clearAllCustomerInfo } from "../../stores/inAppDataInterations/addEditCustomerInfo";
import EmployeesListTable from "../../components/tables/employeesLists";
import UserGroupIcon from "../../assets/icons/user-group";

const breadCrumb = [
  {
    url: "#",
    label: "Employees",
    icon: <UserGroupIcon />,
  },
];
export default function Employees() {
  // const { id } = useParams();
  // const location = useLocation();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Employees",
        pageDescription: "Employees",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  // clear employees info fields
  useEffect(() => {
    dispatch(clearAllCustomerInfo());
  }, []);

  return (
    <section className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <EmployeesListTable />
      </div>
    </section>
  );
}
