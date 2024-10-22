import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import MenuIcon from "../../assets/icons/menu";
import AdminTab from "../../components/tab/adminTab";
import UsersIcon from "../../assets/icons/users";
import ManageAdminUsersTable from "../../components/tables/manageAdminUsersTable";
import ManageRoleTableData from "../../components/tables/manageRolesTable";

const breadCrumb = [
  {
    url: "#",
    label: "Admin",
    icon: <MenuIcon />,
  },
];
export default function AdminManagement() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Admin Management",
        pageDescription: "Admin management",
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
        <AdminTab
          header={[
            { id: 1, icon: <UsersIcon />, label: "Admins" },
            { id: 2, icon: <UsersIcon />, label: "Roles" },
          ]}
          content={[
            {
              id: 1,
              data: <ManageAdminUsersTable />,
            },
            {
              id: 2,
              data: <ManageRoleTableData />,
            },
          ]}
        />
      </div>
    </section>
  );
}
