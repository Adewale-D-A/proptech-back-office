import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../../assets/icons/calendar";
import ImageCarousel from "../../../../components/cards/image-carousel";
import ConfirmationCard from "../../../../components/booking-detail/cofirmation-card";
import RequestInformation from "../../../../components/booking-detail/request-info";
import useGetRequest from "../../../../services-hooks/useGetRequest";
import useGetApartmentById from "../../../../services-hooks/useGetApartmentById";
import useGetCustomerById from "../../../../services-hooks/useGetCustomerById";

const breadCrumb = [
  {
    url: "/bookings",
    label: "Bookings",
    icon: <CalendarIcon />,
  },
  {
    url: "#",
    label: "Request Details",
    icon: "",
  },
];
export default function RequestDetailsById() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Request Details",
        pageDescription: "Request details",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const { data } = useGetRequest({ id });
  const { data: apartment_data } = useGetApartmentById(
    data?.shortlet_id ? String(data?.shortlet_id) : undefined
  );
  const { data: customer } = useGetCustomerById(String(data?.user_id || ""));

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" w-full flex flex-col gap-4 border rounded-md">
            {/* Customer Details */}
            <h4 className="text-lg font-semibold border-b p-3">
              Customer Details
            </h4>
            <div className=" p-3 flex flex-col gap-6">
              <ConfirmationCard data={customer} />{" "}
              <RequestInformation request_details={data} />
            </div>
          </div>
          <div className=" w-full rounded-md border flex flex-col gap-3">
            <h4 className="text-lg font-semibold border-b p-3">
              Apartment Details
            </h4>
            <div className="p-2 ">
              <ImageCarousel
                images={apartment_data?.images?.map((item) => ({
                  url: item?.path,
                }))}
              />
              <div className=" flex flex-col gap-4 py-3">
                <h4 className="text-xl font-semibold">
                  {apartment_data?.name}
                </h4>

                <div className=" flex items-start justify-between gap-4 pb-2 border-b">
                  <span className=" text-gray-500">Check-in Date</span>
                  <span className="">***</span>
                </div>

                <div className=" flex items-start justify-between gap-4 pb-2 border-b">
                  <span className="text-gray-500">Check-out Date</span>
                  <span className="">***</span>
                </div>
                <div className=" flex items-start justify-between gap-4 pb-2">
                  <span className="">Total Amount</span>
                  <span className=" text-primary font-semibold">
                    {apartment_data?.currency} {apartment_data?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
