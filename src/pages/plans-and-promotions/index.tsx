import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import PlansAndPromotionsTab from "../../components/tab/plans-promotionsTab";
import GiftIcon from "../../assets/icons/gift";
import PercentageBadgeIcon from "../../assets/icons/percentage-badge";
import TagsIcon from "../../assets/icons/tags";
import BuildingIcon from "../../assets/icons/building";
import TaxRates from "./tax-rates";
import PricesTypes from "./price-types";
import Coupons from "./coupons";
import PackagesAndOffers from "./package-and-offers";

const breadCrumb = [
  {
    url: "#",
    label: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3 h-3"
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
  },
];
export default function PlansAndPromotions() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Plans and Promotions",
        pageDescription: "Plans and promotions",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <PlansAndPromotionsTab
          header={[
            { id: 1, icon: <BuildingIcon />, label: "Tax Rates" },
            { id: 2, icon: <TagsIcon />, label: "Types of Prices" },
            { id: 3, icon: <PercentageBadgeIcon />, label: "Coupons" },
            { id: 4, icon: <GiftIcon />, label: "Package & Offers" },
          ]}
          content={[
            {
              id: 1,
              data: <TaxRates />,
            },
            {
              id: 2,
              data: <PricesTypes />,
            },
            {
              id: 3,
              data: <Coupons />,
            },
            {
              id: 4,
              data: <PackagesAndOffers />,
            },
          ]}
        />
      </div>
    </section>
  );
}
