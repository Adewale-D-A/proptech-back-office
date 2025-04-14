import { Outlet } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import WrenchIcon from "../../assets/icons/wrench";
import BookMarkIcon from "../../assets/icons/book-mark";
import BanknoteIcon from "../../assets/icons/banknote";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";

export default function RequestsTabWrapper() {
  const { data: maintenanceReqCategory } = useGetResourceAccessChecker({
    resource: "maintenance-request-category",
  });
  const { data: maintenanceReq } = useGetResourceAccessChecker({
    resource: "maintenance-request",
  });
  const { data: requisitionReq } = useGetResourceAccessChecker({
    resource: "requisition-request",
  });
  const tabList = [
    {
      id: 1,
      icon: <WrenchIcon />,
      label: "Maintenance requests",
      url: "/requests/maintenance-requests",
      hide: !maintenanceReq?.view,
    },
    {
      id: 2,
      icon: <BanknoteIcon />,
      label: "Requisition requests",
      url: "/requests/requisition-requests", ///requests/categories
      hide: !requisitionReq?.view,
    },
    {
      id: 3,
      icon: <BookMarkIcon />,
      label: "Requests Categories",
      url: "/requests/categories", ///requests/categories
      hide: !maintenanceReqCategory?.view,
    },
  ];
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
