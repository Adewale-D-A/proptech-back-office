import { NavLink, Outlet } from "react-router-dom";
import MenuIcon from "../../assets/icons/menu";
import CalendarIcon from "../../assets/icons/calendar";
import UserPlusIcon from "../../assets/icons/user-plus";

const tabList = [
  { id: 1, icon: <MenuIcon />, label: "Guest", url: "/chat/guest" },
  {
    id: 2,
    icon: <CalendarIcon />,
    label: "Customer Success",
    url: "/chat/customer-success",
  },
  { id: 3, icon: <CalendarIcon />, label: "Owners", url: "/chat/owners" },
  {
    id: 4,
    icon: <CalendarIcon />,
    label: "Other staff users",
    url: "/chat/other-staff-users",
  },
  { id: 5, icon: <UserPlusIcon />, label: "Vendor", url: "/chat/vendor" },
];
export default function ChatsTabWrapper() {
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
