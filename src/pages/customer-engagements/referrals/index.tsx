import { useLayoutEffect } from "react";
import HeadsetIcon from "../../../assets/icons/headset";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import UsersIcon from "../../../assets/icons/users";
import ReferralsTable from "../../../components/tables/referrals";

const breadCrumb = [
  {
    url: "#",
    label: "Customer Engagements",
    icon: <HeadsetIcon />,
  },
  {
    url: "#",
    label: "Referrals",
    icon: <UsersIcon />,
  },
];
export default function Referrals() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Referrals",
        pageDescription: "Referrals",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <div className=" w-full">
      <ReferralsTable />
    </div>
  );
}
