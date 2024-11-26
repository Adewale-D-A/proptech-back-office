import { useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import AdditionIcon from "../../../../assets/icons/addtion";
import { useAppDispatch } from "../../../../stores/hooks";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import CustomerInfoCard from "../../../../components/booking-detail/customer-info-card";
import ImageCarousel from "../../../../components/cards/image-carousel";
import RequestInformation from "../../../../components/booking-detail/request-info";
import ConfirmationCard from "../../../../components/booking-detail/cofirmation-card";
import useGetRequest from "../../../../services-hooks/useGetRequest";
import useGetCustomerById from "../../../../services-hooks/useGetCustomerById";

const breadCrumb = [
  {
    url: "/additional-services",
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
  const { id } = useParams();
  const { data: customer } = useGetCustomerById(String(id || ""));
  const dispatch = useAppDispatch();
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

  const { data } = useGetRequest({ id });
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
              <RequestInformation addCost request_details={data} />
            </div>
          </div>
          <div className=" w-full rounded-md border flex flex-col gap-3">
            <h4 className="text-lg font-semibold border-b p-3">
              Apartment Details
            </h4>
            <div className="p-2 ">
              <ImageCarousel
                images={[
                  { url: "/temp/temp_apartment_1.jpg" },
                  { url: "/temp/temp_apartment_2.jpg" },
                  { url: "/temp/temp_apartment_2.jpg" },
                ]}
              />
              <div className=" flex flex-col gap-4 py-3">
                <div className=" flex flex-col items-start justify-between gap-4 pb-2 border-b ">
                  <h4 className="text-xl font-semibold">Garden Breeze</h4>
                  <div className="w-full flex justify-between gap-3">
                    <span className=" text-gray-500">Check-in Date</span>
                    <span className="">18/6/2024 10:00</span>
                  </div>
                  <div className="w-full flex justify-between gap-3">
                    <span className=" text-gray-500">Check-out Date</span>
                    <span className="">20/6/2024 10:00</span>
                  </div>
                </div>
                <div className=" flex items-start justify-between gap-4 pb-2">
                  <span className="">Total Amount Paid</span>
                  <span className=" text-primary font-semibold">N150,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
