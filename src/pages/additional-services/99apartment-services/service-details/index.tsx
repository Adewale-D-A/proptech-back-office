import { useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import AdditionIcon from "../../../../assets/icons/addtion";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import ImageCarousel from "../../../../components/cards/image-carousel";
import RequestInformation from "../../../../components/booking-detail/request-info";
import ConfirmationCard from "../../../../components/booking-detail/cofirmation-card";
import useGetCustomerById from "../../../../services-hooks/useGetCustomerById";
import useGetAdditionalServiceById from "../../../../services-hooks/useGetAdditionalService";
import useGetApartmentById from "../../../../services-hooks/useGetApartmentById";
import formatDate from "../../../../utils/isoDateConverter";

const breadCrumb = [
  {
    url: "/additional-services/99apartment-services",
    label: "Additional Services",
    icon: <AdditionIcon />,
  },
  {
    url: "#",
    label: "Service Details",
    icon: "",
  },
];
export default function AdditionalServiceDetailsById() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: service } = useGetAdditionalServiceById(String(id || ""));
  const { data: customer } = useGetCustomerById(String(service?.user_id || ""));
  const { data: apartment } = useGetApartmentById(
    String(service?.booking?.shortlet_id || "")
  );
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Service Details",
        pageDescription: "Service details",
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" w-full flex flex-col gap-4 border rounded-md">
            {/* Customer Details */}
            <h4 className="text-lg font-semibold border-b p-3">
              Customer Details
            </h4>
            <div className=" p-3 flex flex-col gap-6">
              <ConfirmationCard data={customer} />
              <RequestInformation
                addCost={true}
                request_details={{
                  subject: service?.service_type?.name,
                  description: service?.description,
                  created_at: service?.created_at,
                  is_escalated: 0,
                  status: service?.status,
                }}
              />
            </div>
          </div>
          <div className=" w-full rounded-md border flex flex-col gap-3">
            <h4 className="text-lg font-semibold border-b p-3">
              Apartment Details
            </h4>
            <div className="p-2 ">
              <ImageCarousel
                images={apartment?.images?.map((item) => ({ url: item?.path }))}
              />
              <div className=" flex flex-col gap-4 py-3">
                <div className=" flex flex-col items-start justify-between gap-4 pb-2 border-b ">
                  <h4 className="text-xl font-semibold">{apartment?.name}</h4>
                  <div className="w-full flex justify-between gap-3">
                    <span className=" text-gray-500">Check-in Date</span>
                    <span className="">
                      {formatDate(service?.booking?.check_in_date)}{" "}
                      {service?.booking?.check_in_time}
                    </span>
                  </div>
                  <div className="w-full flex justify-between gap-3">
                    <span className=" text-gray-500">Check-out Date</span>{" "}
                    <span className="">
                      {formatDate(service?.booking?.check_out_date)}{" "}
                      {service?.booking?.check_out_time}
                    </span>
                  </div>
                </div>
                <div className=" flex items-start justify-between gap-4 pb-2">
                  <span className="">Total Amount Paid</span>
                  <span className=" text-primary font-semibold">
                    {service?.booking?.currency} {service?.booking?.total_price}
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
