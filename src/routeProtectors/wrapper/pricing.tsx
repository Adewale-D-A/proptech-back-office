import { Outlet } from "react-router-dom";
import MenuIcon from "../../assets/icons/menu";
import ChartIcon from "../../assets/icons/chart";
import TagsIcon from "../../assets/icons/tags";
import KeyIcon from "../../assets/icons/restrictions";
import NavTab from "../../components/tab/nav-tab";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";

export default function PricingTabWrapper() {
  const { data: rateList } = useGetResourceAccessChecker({
    resource: "rate-list",
  });
  const { data: specialPricing } = useGetResourceAccessChecker({
    resource: "special-price",
  });
  const { data: restriction } = useGetResourceAccessChecker({
    resource: "restriction",
  });
  const tabList = [
    {
      id: 1,
      icon: <MenuIcon />,
      label: "Rate Overview",
      url: "/pricing/overview",
      hide: !rateList?.view,
    },
    {
      id: 2,
      icon: <ChartIcon />,
      label: "Rates Table",
      url: "/pricing/rate-table",
      hide: !rateList?.view,
    },
    {
      id: 3,
      icon: <TagsIcon />,
      label: "Special Prices",
      url: "/pricing/special-prices",
      hide: !specialPricing?.view,
    },
    {
      id: 4,
      icon: <KeyIcon />,
      label: "Restriction",
      url: "/pricing/restrictions",
      hide: !restriction?.view,
    },
  ];
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
