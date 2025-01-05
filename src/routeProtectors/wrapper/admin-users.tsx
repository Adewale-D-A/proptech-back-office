import { Outlet, useLocation } from "react-router-dom";
import UsersIcon from "../../assets/icons/users";
import NavTab from "../../components/tab/nav-tab";
import { useEffect, useState } from "react";
import PlusIcon from "../../assets/icons/plus";
import LinkButton from "../../components/button/linkButton";

const tabList = [
  { id: 1, icon: <UsersIcon />, label: "Admins", url: "/admin/admin-users" },
  { id: 2, icon: <UsersIcon />, label: "Roles", url: "/admin/users-roles" },
];
export default function AdminUsersTabWrapper() {
  const [trackTab, setTrackTab] = useState(1);
  const location = useLocation();
  //   update current tab value based on the current URL
  useEffect(() => {
    const found = tabList?.find((item) => item?.url === location?.pathname);
    setTrackTab(found?.id || 1);
  }, [location]);
  return (
    <section className="w-full flex flex-col gap-5">
      <div className={"flex items-center gap-5 flex-col md:flex-row"}>
        <NavTab tabList={tabList} />
        <div className="w-fit whitespace-nowrap">
          {trackTab === 1 ? (
            <LinkButton
              url="/admin/add"
              label="Add New Admin User"
              startIcon={<PlusIcon />}
            />
          ) : (
            <LinkButton
              url="/admin/admin-roles/add"
              label="Add New Admin Role"
              startIcon={<PlusIcon />}
            />
          )}
        </div>
      </div>
      <Outlet />
    </section>
  );
}
