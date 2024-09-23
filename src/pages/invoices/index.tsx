import InvoiceTab from "../../components/tab/invoiceTab";
import BuildingIcon from "../../assets/icons/building";
import PlusIcon from "../../assets/icons/plus";
import ApartmentInvoice from "./apartment-invoices";
import AdditionalServicesInvoice from "./addition-services-invoices";

export default function Invoices() {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <InvoiceTab
          header={[
            { id: 1, icon: <BuildingIcon />, label: "Apartments" },
            { id: 2, icon: <PlusIcon />, label: "Additional services" },
          ]}
          content={[
            {
              id: 1,
              data: <ApartmentInvoice />,
            },
            {
              id: 2,
              data: <AdditionalServicesInvoice />,
            },
          ]}
        />
      </div>
    </section>
  );
}
