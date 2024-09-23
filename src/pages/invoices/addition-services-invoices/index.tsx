import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ReceiptIcon from "../../../assets/icons/receipt";
import InvoiceListsTable from "../../../components/tables/apartmentInvoiceLists";

const breadCrumb = [
  {
    url: "#",
    label: "Invoices",
    icon: <ReceiptIcon />,
  },
];
export default function AdditionalServicesInvoice() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Additional Services Invoice",
        pageDescription: "Additional services invoice",
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
        <InvoiceListsTable
          header={[
            "Invoice Number",
            "Booking ID",
            "Emailed To",
            "Created On",
            "Created By",
            "Status",
            "Action",
          ]}
        />
      </div>
    </section>
  );
}
