import { useLayoutEffect } from "react";
import ReceiptIcon from "../../../../assets/icons/receipt";
import AddEditRestriction from "../add-edit";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";

const breadCrumb = [
  {
    url: "/pricing/restrictions",
    label: "Restriction",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "New Restriction",
    icon: "",
  },
];
export default function AddRestriction() {
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
  return <AddEditRestriction />;
}
