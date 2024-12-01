import { useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import AddEditRestriction from "../add-edit";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../../assets/icons/receipt";

const breadCrumb = [
  {
    url: "/pricing/restrictions",
    label: "Restriction",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "Update Restriction",
    icon: "",
  },
];

export default function EditRestriction() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Update Pricing Restriction",
        pageDescription: "Update pricing restriction",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
  return <AddEditRestriction id={id} />;
}
