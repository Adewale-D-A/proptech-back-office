import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../../assets/icons/calendar";
import ImageCarousel from "../../../../components/cards/image-carousel";
import ConfirmationCard from "../../../../components/booking-detail/cofirmation-card";
import UserPlusIcon from "../../../../assets/icons/user-plus";
import Status from "../../../../components/status";

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
              <ConfirmationCard />{" "}
              <div className=" w-full bg-gray-100 rounded-md">
                <h4 className=" font-semibold p-3 text-md flex items-center gap-2">
                  <UserPlusIcon /> <span>Request Details</span>{" "}
                </h4>
                <div className=" w-full border-t p-3 text-xs flex flex-col gap-3">
                  {[
                    {
                      id: 1,
                      header: "Request Type",
                      value: "Internet",
                    },
                    {
                      id: 2,
                      header: "Description",
                      value: "Internet not working",
                    },
                    {
                      id: 3,
                      header: "Date of request",
                      value: "24-06-2024",
                    },
                    {
                      id: 4,
                      header: "Escalated Status",
                      value: "Yes",
                    },
                  ].map((item) => (
                    <div
                      key={item?.id}
                      className=" w-full flex items-center justify-between gap-5"
                    >
                      <span className=" text-gray-500">{item?.header}</span>
                      <span className=" font-semibold">{item?.value}</span>
                    </div>
                  ))}
                  <div className=" w-full flex items-center justify-between gap-5">
                    <span className=" text-gray-500">Status</span>
                    <span className=" font-semibold">
                      <Status status="Resolved" />
                    </span>
                  </div>
                </div>
              </div>
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
                <h4 className="text-xl font-semibold">Garden Breeze</h4>

                <div className=" flex items-start justify-between gap-4 pb-2 border-b">
                  <span className=" text-gray-500">Check-in Date</span>
                  <span className="">18/6/2024 10:00</span>
                </div>

                <div className=" flex items-start justify-between gap-4 pb-2 border-b">
                  <span className="text-gray-500">Check-out Date</span>
                  <span className="">20/6/2024 10:00</span>
                </div>
                <div className=" flex items-start justify-between gap-4 pb-2">
                  <span className="">Total Amount</span>
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
