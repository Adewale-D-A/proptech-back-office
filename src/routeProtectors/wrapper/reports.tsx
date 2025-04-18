import { Outlet } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import ClipBoardIcon from "../../assets/icons/clipboard";
import BookMarkIcon from "../../assets/icons/book-mark";
import DollarIcon from "../../assets/icons/dollar";
import BillIcon from "../../assets/icons/bill";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";

export default function ReportsTabWrapper() {
  const { data: reportDashboard } = useGetResourceAccessChecker({
    resource: "report-dashboard",
  });
  const { data: requisitionReq } = useGetResourceAccessChecker({
    resource: "requisition-request",
  });
  const { data: revenueReport } = useGetResourceAccessChecker({
    resource: "revenue-report",
  });
  const { data: occupancyReport } = useGetResourceAccessChecker({
    resource: "occupancy-report",
  });
  const { data: booking } = useGetResourceAccessChecker({
    resource: "booking",
  });
  const { data: occupancy_report } = useGetResourceAccessChecker({
    resource: "occupancy-report",
  });
  const { data: owner_report } = useGetResourceAccessChecker({
    resource: "owner-report-entry",
  });
  const { data: expense_category } = useGetResourceAccessChecker({
    resource: "expense-category",
  });
  const tabList = [
    {
      id: 1,
      icon: <ClipBoardIcon />,
      label: "Revenue Reports",
      url: "/reports/revenue",
      hide: !revenueReport?.view,
    },
    {
      id: 2,
      icon: <ClipBoardIcon />,
      label: "Occupancy Ranking",
      url: "/reports/occupancy-ranking",
      hide: !occupancyReport?.view,
    },
    {
      id: 3,
      icon: <ClipBoardIcon />,
      label: "Daily Room",
      url: "/reports/daily-room",
      hide: !reportDashboard?.view,
    },
    {
      id: 4,
      icon: <ClipBoardIcon />,
      label: "Occupany Per Time",
      url: "/reports/occupancy-per-time",
      hide: !occupancy_report?.view,
    },
    {
      id: 5,
      icon: <DollarIcon />,
      label: "Maintenance Expenses",
      url: "/reports/maintenance-expenses",
      hide: !requisitionReq?.view,
    },
    {
      id: 6,
      icon: <BookMarkIcon />,
      label: "Bookings",
      url: "/reports/bookings",
      hide: !booking?.view,
    },
    {
      id: 8,
      icon: <BillIcon />,
      label: "Owners Report",
      url: "/reports/owners-report/summary",
      hide: !owner_report?.view,
    },
    {
      id: 9,
      icon: <BillIcon />,
      label: "Expense Category",
      url: "/reports/expense-category",
      hide: !expense_category?.view,
    },
    // {
    //   id: 7,
    //   icon: <PowerIcon />,
    //   label: "Generator Runtime",
    //   url: "/reports/generator-runtime",
    // },
  ];
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
