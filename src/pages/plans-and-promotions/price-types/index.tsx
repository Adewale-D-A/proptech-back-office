import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import PercentageBadgeIcon from "../../../assets/icons/percentage-badge";
import PriceTypeList from "../../../components/tables/pricesTypesLists";

const breadCrumb = [
  {
    url: "#",
    label: "Plans & Promotions",
    icon: <PercentageBadgeIcon />,
  },
  {
    url: "#",
    label: "Prices Types",
    icon: <PercentageBadgeIcon />,
  },
];
export default function PricesTypes() {
  const { id } = useParams();
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
          <PriceTypeList
            header={[
              "Price Name",
              "Price Attributes",
              "Tax Rates",
              "Restrictions",
              "Breakfast Included",
              "Refundable",
              "Action",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
