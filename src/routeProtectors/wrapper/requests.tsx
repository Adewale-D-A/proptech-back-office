import { Outlet } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import WrenchIcon from "../../assets/icons/wrench";
import BookMarkIcon from "../../assets/icons/book-mark";
import BanknoteIcon from "../../assets/icons/banknote";

const tabList = [
  {
    id: 1,
    icon: <WrenchIcon />,
    label: "Maintenance requests",
    url: "/requests/maintenance-requests",
  },
  {
    id: 2,
    icon: <BanknoteIcon />,
    label: "Requisition requests",
    url: "/requests/requisition-requests", ///requests/categories
  },
  {
    id: 3,
    icon: <BookMarkIcon />,
    label: "Requests Categories",
    url: "/requests/categories", ///requests/categories
  },
];
export default function RequestsTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
