import { useAppDispatch } from "../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import AddEditInvoice from "../add-edit";
import { useParams } from "react-router-dom";

const breadCrumb = [
  {
    url: "/invoices/apartment",
    label: "Invoices",
    icon: <ReceiptIcon />,
  },
  {
    url: "#",
    label: "Edit Invoice",
    icon: "",
  },
];
export default function EditInvoice() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Edit Invoice",
        pageDescription: "Edit invoice",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return <AddEditInvoice id={id} />;
}
