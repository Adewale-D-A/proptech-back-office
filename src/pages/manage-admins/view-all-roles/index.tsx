import { useLayoutEffect } from "react";
import MenuIcon from "../../../assets/icons/menu";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ManageRoleTableData from "../../../components/tables/manageRolesTable";

const breadCrumb = [
  {
    url: "/admin-users-management",
    label: "Admin users roles",
    icon: <MenuIcon />,
  },
];
export default function AdminManagementViewAllRoles() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Admin Management users roles",
        pageDescription: "Admin management users roles",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return <ManageRoleTableData />;
}
