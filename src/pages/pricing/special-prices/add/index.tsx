import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../../stores/hooks";
import AddEditSpecialPrices from "../add-edit";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../../assets/icons/receipt";

const breadCrumb = [
  {
    url: "/pricing/special-prices",
    label: "Special Price",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "New Special Price",
    icon: "",
  },
];
export default function AddSpecialPricing() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "New Special Pricing",
        pageDescription: "New special pricing",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return <AddEditSpecialPrices />;
}
