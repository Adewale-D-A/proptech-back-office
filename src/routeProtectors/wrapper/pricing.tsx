import { Outlet } from "react-router-dom";
import MenuIcon from "../../assets/icons/menu";
import ChartIcon from "../../assets/icons/chart";
import TagsIcon from "../../assets/icons/tags";
import KeyIcon from "../../assets/icons/restrictions";
import NavTab from "../../components/tab/nav-tab";

const tabList = [
  {
    id: 1,
    icon: <MenuIcon />,
    label: "Rate Overview",
    url: "/pricing/overview",
  },
  {
    id: 2,
    icon: <ChartIcon />,
    label: "Rates Table",
    url: "/pricing/rate-table",
  },
  {
    id: 3,
    icon: <TagsIcon />,
    label: "Special Prices",
    url: "/pricing/special-prices",
  },
  {
    id: 4,
    icon: <KeyIcon />,
    label: "Restriction",
    url: "/pricing/restrictions",
  },
];
export default function PricingTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
