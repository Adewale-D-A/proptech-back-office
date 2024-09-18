import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../assets/icons/receipt";
import PricingTab from "../../components/tab/bookingTab";
import MenuIcon from "../../assets/icons/menu";
import ChartIcon from "../../assets/icons/chart";
import TagsIcon from "../../assets/icons/tags";
import KeyIcon from "../../assets/icons/restrictions";
import PricingOverview from "./pricing-overview";
import RateTable from "./rates-table";
import SpecialPrices from "./special-prices";
import NewPricingRestrictions from "./pricing-restriction";

const breadCrumb = [
  {
    url: "#",
    label: "Pricing",
    icon: <ReceiptIcon />,
  },
];
export default function Pricing() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Pricing",
        pageDescription: "Pricing",
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
        <PricingTab
          header={[
            { id: 1, icon: <MenuIcon />, label: "Rate Overview" },
            { id: 2, icon: <ChartIcon />, label: "Rates Table" },
            { id: 3, icon: <TagsIcon />, label: "Special Prices" },
            { id: 4, icon: <KeyIcon />, label: "Restriction" },
          ]}
          content={[
            {
              id: 1,
              data: <PricingOverview />,
            },
            {
              id: 2,
              data: <RateTable />,
            },
            {
              id: 3,
              data: <SpecialPrices />,
            },
            {
              id: 4,
              data: <NewPricingRestrictions />,
            },
          ]}
        />
      </div>
    </section>
  );
}
