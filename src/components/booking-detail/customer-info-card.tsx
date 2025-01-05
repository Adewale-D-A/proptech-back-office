import { customersById } from "../../types/apiData/customers";
import AddressCard from "./address-card";
import ConfirmationCard from "./cofirmation-card";

export default function CustomerInfoCard({ data }: { data: customersById }) {
  return (
    <div className=" w-full flex flex-col gap-6">
      <ConfirmationCard data={data} />
      <AddressCard data={data} />
    </div>
  );
}
