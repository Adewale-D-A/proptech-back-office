import { useAppDispatch } from "../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import AddEditInvoice from "../add-edit";

const breadCrumb = [
  {
    url: "/invoices/apartment",
    label: "Invoices",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "New Invoice",
    icon: "",
  },
];
export default function AddNewInvoice() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "New Invoice",
        pageDescription: "Add new invoice",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return <AddEditInvoice />;
}
