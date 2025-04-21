import { Outlet } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import UsersIcon from "../../assets/icons/users";
import Starcon from "../../assets/icons/star";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";

export default function CustomerEngagementsTabWrapper() {
  const { data: rating } = useGetResourceAccessChecker({
    resource: "rating",
  });
  const { data: referral } = useGetResourceAccessChecker({
    resource: "referral",
  });
  const tabList = [
    {
      id: 1,
      icon: <Starcon />,
      label: "Ratings & Reviews",
      url: "/customer-engagements/ratings-and-reviews",
      hide: !rating?.view,
    },
    {
      id: 2,
      icon: <UsersIcon />,
      label: "Referrals",
      url: "/customer-engagements/referrals",
      hide: !referral?.view,
    },
  ];
  return (
    <section className="w-full flex flex-col gap-5">
      <NavTab tabList={tabList} />
      <Outlet />
    </section>
  );
}
