import { useAppDispatch } from "../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import PercentageBadgeIcon from "../../../assets/icons/percentage-badge";
import TaxRateLists from "../../../components/tables/taxRateLists";

const breadCrumb = [
  {
    url: "#",
    label: "Plans & Promotions",
    icon: <PercentageBadgeIcon />,
  },
  {
    url: "#",
    label: "Tax Rates",
    icon: <PercentageBadgeIcon />,
  },
];
export default function TaxRates() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Tax Rates",
        pageDescription: "Tax rates",
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
          <TaxRateLists
            header={[
              "S/N",
              "Tax Name",
              "Tax Rate",
              "Created On",
              "Tax Breakdown",
              "Action",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
