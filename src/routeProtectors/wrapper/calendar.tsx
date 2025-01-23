import { Outlet } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import WrenchIcon from "../../assets/icons/wrench";
import BookMarkIcon from "../../assets/icons/book-mark";

const tabList = [
  {
    id: 1,
    icon: <WrenchIcon />,
    label: "Maintenance calendar",
    url: "/calendar/maintenance-calendar",
  },
  {
    id: 2,
    icon: <BookMarkIcon />,
    label: "Booking calendar",
    url: "/calendar/boooking-calendar",
  },
];
export default function CalendarTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
