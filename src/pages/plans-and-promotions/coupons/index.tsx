import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import AllBookingsListTable from "../../../components/tables/allBookingsLists";
import PercentageBadgeIcon from "../../../assets/icons/percentage-badge";
import CouponList from "../../../components/tables/couponsLists";

const breadCrumb = [
  {
    url: "#",
    label: "Plans & Promotions",
    icon: <PercentageBadgeIcon />,
  },
  {
    url: "#",
    label: "Coupons",
    icon: "",
  },
];
export default function Coupons() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Coupons",
        pageDescription: "Coupons",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return (
    <section className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div>
          <CouponList
            header={[
              "Coupon Name",
              "Coupon Type",
              "Validity Dates",
              "Rooms",
              "Min Booking Total",
              "Number of Users",
              "Action",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
