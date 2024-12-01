import { Outlet } from "react-router-dom";
import DoorIcon from "../../assets/icons/door";
import NavTab from "../../components/tab/nav-tab";

const tabList = [
  {
    id: 1,
    icon: <DoorIcon />,
    label: "99 Apartment Services",
    url: "/additional-services/99apartment-services",
  },
  // { id: 2, icon: <StallIcon />, label: "Vendor Services", url: "/additional-services/vendor-services" },
];
export default function AdditionalServicesTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
