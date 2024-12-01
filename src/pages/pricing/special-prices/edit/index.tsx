import { useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import AddEditSpecialPrices from "../add-edit";
import { useAppDispatch } from "../../../../stores/hooks";
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
    label: "Update Special Price",
    icon: "",
  },
];
export default function EditSpecialPricing() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Update Special Pricing",
        pageDescription: "Update special pricing",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return <AddEditSpecialPrices id={id} />;
}
