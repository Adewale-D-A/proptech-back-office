import LinkButton from "../button/linkButton";
import Search from "../inputs/search";
import BookingInfo from "./booking-info";
import CustomerInfoCard from "./customer-info-card";

export default function BookingDetailSummary({ id }: { id: string }) {
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
          url={`/booking-details/${id}`}
          label="View Details"
          variant={2}
        />

        <LinkButton
          url={`/booking-details/edit-reservation/${id}`}
          label="Edit Reservation"
        />
      </div>
    </div>
  );
}
