import AddressCard from "./address-card";
import ConfirmationCard from "./cofirmation-card";

export default function CustomerInfoCard() {
  return (
    <div className=" w-full flex flex-col gap-6">
      <ConfirmationCard />
      <AddressCard />
    </div>
  );
}
