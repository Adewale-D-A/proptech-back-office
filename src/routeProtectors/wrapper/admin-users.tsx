import { NavLink, Outlet } from "react-router-dom";
import UsersIcon from "../../assets/icons/users";

const tabList = [
  { id: 1, icon: <UsersIcon />, label: "Admins", url: "/admin/admin-users" },
  { id: 2, icon: <UsersIcon />, label: "Roles", url: "/admin/users-roles" },
];
export default function AdminUsersTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <nav className="w-full flex items-center gap-4 px-5 ">
        {tabList?.map((items) => {
          return (
            <div key={items?.id} className="w-full group">
              <NavLink
                to={items?.url}
                className={({ isActive }) =>
                  isActive
                    ? `flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 border-primary focus:outline-none text-primary border-b-4  data-[hover]:text-primary outline-1 outline-white`
                    : `flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 border-primary text-gray-400 focus:outline-none hover:border-b-4  hover:text-primary focus:outline-1 focus:outline-white`
                }
              >
                {items?.icon} {items?.label}
              </NavLink>
            </div>
          );
        })}
      </nav>
      <Outlet />
    </section>
  );
}
