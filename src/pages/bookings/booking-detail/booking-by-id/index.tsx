import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../../assets/icons/calendar";
import CustomerInfoCard from "../../../../components/booking-detail/customer-info-card";
import ImageCarousel from "../../../../components/cards/image-carousel";
import UserPlusIcon from "../../../../assets/icons/user-plus";
import BookingByIdList from "../../../../components/tables/bookingList";
import useGetBookingById from "../../../../services-hooks/bookings/useGetBookingById";
import useGetCustomerById from "../../../../services-hooks/useGetCustomerById";
import useGetApartmentById from "../../../../services-hooks/useGetApartmentById";

const breadCrumb = [
  {
    url: "/bookings/overview",
    label: "Bookings",
    icon: <CalendarIcon />,
  },
  {
    url: "#",
    label: "Bookings Details",
    icon: "",
  },
];
export default function BookingDetailsById() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Bookings Details",
        pageDescription: "Bookings details",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const { data, isFailed, setIsFailed, isLoading } = useGetBookingById(id);
  const { data: customer } = useGetCustomerById(String(data?.user_id || ""));
  const { data: apartment } = useGetApartmentById(
    String(data?.shortlet_id || "")
  );

  return (
    <section className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <BookingByIdList data={{ ...data, user: customer }} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" w-full flex flex-col gap-4 border rounded-md">
            {/* Customer Details */}
            <h4 className="text-lg font-semibold border-b p-3">
              Customer Details
            </h4>
            <div className=" p-3 flex flex-col gap-6">
              <CustomerInfoCard data={customer} />
              <div className="w-full flex flex-col gap-3 items-end">
                <div className="w-full flex justify-between items-center border rounded-md px-3">
                  <span>{customer?.email}</span>
                  <button
                    type="button"
                    //   onClick={() => assignCustomer()}
                    title="assign customer"
                    className=" flex justify-center items-center p-3"
                  >
                    <UserPlusIcon />
                  </button>
                </div>
                <button className=" text-primary underline">
                  Send Custom Email
                </button>
              </div>
              <div className="w-full flex flex-col gap-3 items-end">
                <div className="w-full flex justify-between items-center">
                  <div className="w-full flex pl-4 border rounded-lg bg-gray-200/15 p-3">
                    <span>{customer?.phone}</span>
                  </div>
                  <button
                    type="button"
                    //   onClick={() => assignCustomer()}
                    title="assign customer"
                    className=" flex justify-center items-center p-3"
                  >
                    <UserPlusIcon />
                  </button>
                </div>
                <button className=" text-primary underline">
                  Send Custom SMS
                </button>
              </div>
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
                <div className=" flex items-start justify-between gap-4 pb-2 border-b ">
                  <div>
                    <h4 className="text-xl font-semibold">{apartment?.name}</h4>
                    {/* <span className=" text-gray-500">Room 1</span> */}
                  </div>
                  <h4 className=" text-primary text-xl font-semibold">
                    {data?.shortlet?.currency} {data?.shortlet?.price}
                    <span className=" font-thin text-black text-sm">
                      /Night
                    </span>
                  </h4>
                </div>
                <div className=" flex items-start justify-between gap-4 pb-2 border-b ">
                  <h4 className="text-lg font-semibold">Amount Details</h4>
                </div>
                <div className=" flex items-start justify-between gap-4 pb-2 border-b  text-gray-500 ">
                  <span className="">Caution Fee</span>
                  <span>
                    {apartment?.currency} {apartment?.caution_fee}
                  </span>
                </div>
                <div className=" flex items-start justify-between gap-4 pb-2">
                  <span className="">Total Amount</span>
                  <span className=" text-primary font-semibold">
                    {apartment?.currency} {apartment?.price}
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
