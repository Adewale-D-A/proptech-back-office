import { Outlet } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import UsersIcon from "../../assets/icons/users";
import Starcon from "../../assets/icons/star";

const tabList = [
  {
    id: 1,
    icon: <Starcon />,
    label: "Ratings & Reviews",
    url: "/customer-engagements/ratings-and-reviews",
  },
  {
    id: 2,
    icon: <UsersIcon />,
    label: "Referrals",
    url: "/customer-engagements/referrals",
  },
];
export default function CustomerEngagementsTabWrapper() {
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
