import LoadingButton from "../button";
import LinkButton from "../button/linkButton";
import Search from "../inputs/search";
import BookingInfo from "./booking-info";
import CustomerInfoCard from "./customer-info-card";

export default function BookingDetailSummary() {
  return (
    <div className=" w-full flex flex-col gap-6">
      <Search
        id="booking-search"
        placeholder="Apartment name, type, location..."
      />
      <CustomerInfoCard />
      <BookingInfo />

      <div className=" flex items-center gap-5">
        <LinkButton
          url={`/booking-details/${"asixllsii34"}`}
          label="View Details"
          variant={2}
        />

        <LinkButton url="#" label="Edit Reservation" />
      </div>
    </div>
  );
}
