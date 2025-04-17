import useGetBookingById from "../../services-hooks/bookings/useGetBookingById";
import useGetCustomerById from "../../services-hooks/useGetCustomerById";
import useGetResourceAccessChecker from "../../utils/admin/useAccessChecker";
import LinkButton from "../button/linkButton";
import Search from "../inputs/search";
import BookingInfo from "./booking-info";
import CustomerInfoCard from "./customer-info-card";

export default function BookingDetailSummary({ id }: { id: string }) {
  const { data, isFailed, setIsFailed, isLoading } = useGetBookingById(id);
  const { data: customer } = useGetCustomerById(String(data?.user_id || ""));
  const { data: booking } = useGetResourceAccessChecker({
    resource: "booking",
  });
  return (
    <div className=" w-full flex flex-col gap-6">
      <Search
        id="booking-search"
        placeholder="Apartment name, type, location..."
      />
      <CustomerInfoCard data={customer} />
      <BookingInfo data={data} />

      <div className=" flex items-center gap-5">
        <LinkButton
          url={`/bookings/booking-details/${id}`}
          label="View Details"
          variant={2}
        />
        {booking?.update && (
          <LinkButton
            url={`/bookings/booking-details/edit-reservation/${id}`}
            label="Edit Reservation"
          />
        )}
      </div>
    </div>
  );
}
