import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import PricingRestrictionsTable from "../../../components/tables/pricing-restrictions";
import LinkButton from "../../../components/button/linkButton";
import PlusIcon from "../../../assets/icons/plus";

const breadCrumb = [
  {
    url: "#",
    label: "Pricing",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "Restriction",
    icon: "",
  },
];

export default function NewPricingRestrictions() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "New Pricing Restriction",
        pageDescription: "New pricing restriction",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <div className=" w-full flex flex-col gap-4">
      <div className=" w-full flex justify-end">
        <div>
          <LinkButton
            url="/pricing/add-restriction"
            label="Add Restriction"
            startIcon={<PlusIcon />}
          />
        </div>
      </div>
      <PricingRestrictionsTable />
    </div>
  );
}
