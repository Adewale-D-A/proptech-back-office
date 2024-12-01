import { Outlet } from "react-router-dom";
import MenuIcon from "../../assets/icons/menu";
import CalendarIcon from "../../assets/icons/calendar";
import UserPlusIcon from "../../assets/icons/user-plus";
import NavTab from "../../components/tab/nav-tab";

const tabList = [
  { id: 1, icon: <MenuIcon />, label: "Overview", url: "/bookings/overview" },
  {
    id: 2,
    icon: <CalendarIcon />,
    label: "Calendar",
    url: "/bookings/calendar",
  },
  {
    id: 3,
    icon: <CalendarIcon />,
    label: "Availability Overview",
    url: "/bookings/availability-overview",
  },
  {
    id: 4,
    icon: <CalendarIcon />,
    label: "All Bookings",
    url: "/bookings/view-all",
  },
  {
    id: 5,
    icon: <UserPlusIcon />,
    label: "Request",
    url: "/bookings/requests",
  },
];
export default function BookingTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
