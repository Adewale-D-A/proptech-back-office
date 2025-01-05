import { Outlet } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import ClipBoardIcon from "../../assets/icons/clipboard";

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
];
export default function ReportsTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
