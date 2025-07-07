import { Outlet, useLocation } from "react-router-dom";
import NavTab from "../../components/tab/nav-tab";
import UsersIcon from "../../assets/icons/users";
import Starcon from "../../assets/icons/star";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import ModalTemplate from "../../components/modal";
import { useEffect, useState } from "react";
import UpdateReferralRatePercentage from "../../pages/customer-engagements/referrals/update-rate";
import LoadingButton from "../../components/button";

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
  const location = useLocation();
  const [trackTab, setTrackTab] = useState(1);
  const [openSettings, setOpenSettings] = useState(false);
  //   update current tab value based on the current URL
  useEffect(() => {
    const found = tabList?.find((item) => item?.url === location?.pathname);
    setTrackTab(found?.id || 1);
  }, [location]);

  return (
    <>
      <section className="w-full flex flex-col gap-5">
        <div className={"flex items-center gap-5 flex-col md:flex-row"}>
          <NavTab tabList={tabList} />
          <div className="w-fit whitespace-nowrap">
            {trackTab === 2 && referral?.create && (
              <LoadingButton
                type="button"
                isLoading={false}
                clickHandler={() => setOpenSettings(true)}
                label="Update Referral Percentage"
              />
            )}
          </div>
        </div>
        <Outlet />
      </section>
      <ModalTemplate
        open={openSettings}
        setOpen={setOpenSettings}
        showXicon={true}
        title="Referral Settings"
        className=" max-w-md"
      >
        <UpdateReferralRatePercentage onClose={setOpenSettings} />
      </ModalTemplate>
    </>
  );
}
