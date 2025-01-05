import { useLayoutEffect } from "react";
import MenuIcon from "../../../assets/icons/menu";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ManageAdminUsersTable from "../../../components/tables/manageAdminUsersTable";

const breadCrumb = [
  {
    url: "/admin-users-management",
    label: "Admin users",
    icon: <MenuIcon />,
  },
];
export default function AdminManagementViewAll() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Admin Management users",
        pageDescription: "Admin management users",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return <ManageAdminUsersTable />;
}
