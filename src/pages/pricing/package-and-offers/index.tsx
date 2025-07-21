import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import PercentageBadgeIcon from "../../../assets/icons/percentage-badge";
import PackagesAndOfferList from "../../../components/tables/packagesAndOfferLists";

const breadCrumb = [
  {
    url: "/pricing/tax-rates",
    label: "Plans & Promotions",
    icon: <PercentageBadgeIcon />,
  },
  {
    url: "#",
    label: "Packages & Offers",
    icon: <PercentageBadgeIcon />,
  },
];
export default function PackagesAndOffers() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Packages & Offers",
        pageDescription: "Packages and offers",
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
          <PackagesAndOfferList
            header={[
              "ID",
              "Package Name",
              "From this Date",
              "To this Date",
              "Price",
              "No of Rooms Affected",
              "Action",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
