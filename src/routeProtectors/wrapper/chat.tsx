import { NavLink, Outlet } from "react-router-dom";
import MenuIcon from "../../assets/icons/menu";
import CalendarIcon from "../../assets/icons/calendar";
import UserPlusIcon from "../../assets/icons/user-plus";
import NavTab from "../../components/tab/nav-tab";

const tabList = [
  { id: 1, icon: <MenuIcon />, label: "Guest", url: "/chat/guest" },
  // {
  //   id: 2,
  //   icon: <CalendarIcon />,
  //   label: "Customer Success",
  //   url: "/chat/customer-success",
  // },
  // { id: 3, icon: <CalendarIcon />, label: "Owners", url: "/chat/owners" },
  // {
  //   id: 4,
  //   icon: <CalendarIcon />,
  //   label: "Other staff users",
  //   url: "/chat/other-staff-users",
  // },
  // { id: 5, icon: <UserPlusIcon />, label: "Vendor", url: "/chat/vendor" },
];
export default function ChatsTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
