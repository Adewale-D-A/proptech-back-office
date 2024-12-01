import { Outlet } from "react-router-dom";
import UsersIcon from "../../assets/icons/users";
import NavTab from "../../components/tab/nav-tab";

const tabList = [
  { id: 1, icon: <UsersIcon />, label: "Admins", url: "/admin/admin-users" },
  { id: 2, icon: <UsersIcon />, label: "Roles", url: "/admin/users-roles" },
];
export default function AdminUsersTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
