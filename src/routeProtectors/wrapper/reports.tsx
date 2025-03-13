import { Outlet } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import ClipBoardIcon from "../../assets/icons/clipboard";
import PowerIcon from "../../assets/icons/power";
import BookMarkIcon from "../../assets/icons/book-mark";
import DollarIcon from "../../assets/icons/dollar";
import BillIcon from "../../assets/icons/bill";

const tabList = [
  {
    id: 1,
    icon: <ClipBoardIcon />,
    label: "Revenue Reports",
    url: "/reports/revenue",
  },
  {
    id: 2,
    icon: <ClipBoardIcon />,
    label: "Occupancy Ranking",
    url: "/reports/occupancy-ranking",
  },
  {
    id: 3,
    icon: <ClipBoardIcon />,
    label: "Daily Room",
    url: "/reports/daily-room",
  },
  {
    id: 4,
    icon: <ClipBoardIcon />,
    label: "Occupany Per Time",
    url: "/reports/occupancy-per-time",
  },
  {
    id: 5,
    icon: <DollarIcon />,
    label: "Maintenance Expenses",
    url: "/reports/maintenance-expenses",
  },
  {
    id: 6,
    icon: <BookMarkIcon />,
    label: "Bookings",
    url: "/reports/bookings",
  },
  {
    id: 8,
    icon: <BillIcon />,
    label: "Owners Report",
    url: "/reports/owners-report/summary",
  },
  // {
  //   id: 7,
  //   icon: <PowerIcon />,
  //   label: "Generator Runtime",
  //   url: "/reports/generator-runtime",
  // },
];
export default function ReportsTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
