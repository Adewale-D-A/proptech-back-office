import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../../assets/icons/calendar";
import Status from "../../../../components/status";
import CustomerInfoCard from "../../../../components/booking-detail/customer-info-card";
import ImageCarousel from "../../../../components/cards/image-carousel";
import UserPlusIcon from "../../../../assets/icons/user-plus";
import PhoneInput from "../../../../components/inputs/phoneInput";

const breadCrumb = [
  {
    url: "/bookings",
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

  const [selectedCountryCode, setSelectedCountryCode] =
    useState("+234+Nigeria");
  const [phoneNumber, setPhoneNumber] = useState("8103760742");

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" p-3 rounded-lg border">
          <table className=" w-full text-xs">
            <thead className="">
              <tr className=" text-left bg-gray-200 text-gray-500 rounded-lg">
                {[
                  "ID",
                  "Customer Name",
                  "Date of Booking",
                  "No of Rooms",
                  "Amount",
                  "Check-in Date",
                  "Check-out Date",
                  "Status",
                  "Action",
                ].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {[
                {
                  id: "asasas",
                  customerName: "Jola Samson",
                  apartnmentName: "Sunshine - 2 Bedroom",
                  bookingDate: "15-02-2024",
                  noOfRooms: "4 Rooms",
                  amount: "N150,000",
                  checkIn: "15-02-2024",
                  checkOut: "15-02-2024",
                  status: "Confirmed",
                },
              ].map((request, index) => {
                return (
                  <tr key={request?.id} className=" border-b">
                    <td>{request?.id}</td>
                    <td>{request?.customerName}</td>
                    <td>{request?.bookingDate}</td>
                    <td>{request?.noOfRooms}</td>
                    <td>{request?.amount}</td>
                    <td>{request?.checkIn}</td>
                    <td>{request?.checkOut}</td>
                    <td>
                      <Status status={request?.status} />
                    </td>
                    <td className=" group relative">
                      <span className=" p-2 text-lg">...</span>
                      <span className="z-10 text-center group-hover:flex hidden w-52 bg-white text-sm absolute right-0 top-0 rounded-lg shadow-lg flex-col">
                        <button
                          type="button"
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Resend Email
                        </button>
                        <Link
                          to={`/edit-apartment/apartment-details/${request?.id}`}
                          className=" p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Edit Reservation
                        </Link>
                        <Link
                          to={`/apartment-caledar/${request?.id}`}
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          View In Front Site
                        </Link>
                        <button
                          type="button"
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Delete Reservation
                        </button>
                        <button
                          type="button"
                          className="p-3 px-4 hover:bg-primary/10 transition-all rounded-lg"
                        >
                          Set To Be Confirmed
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" w-full flex flex-col gap-4 border rounded-md">
            {/* Customer Details */}
            <h4 className="text-lg font-semibold border-b p-3">
              Customer Details
            </h4>
            <div className=" p-3 flex flex-col gap-6">
              <CustomerInfoCard />
              <div className="w-full flex flex-col gap-3 items-end">
                <div className="w-full flex justify-between items-center border rounded-md px-3">
                  <span>funsho.m@yahoo.com</span>
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
                  <PhoneInput
                    coutryCode={selectedCountryCode}
                    setCountryCode={setSelectedCountryCode}
                    number={phoneNumber}
                    setNumber={setPhoneNumber}
                    label={""}
                    isRequired={true}
                    id="phone-number"
                  />
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
                images={[
                  { url: "/temp/temp_apartment_1.jpg" },
                  { url: "/temp/temp_apartment_2.jpg" },
                  { url: "/temp/temp_apartment_2.jpg" },
                ]}
              />
              <div className=" flex flex-col gap-4 py-3">
                <div className=" flex items-start justify-between gap-4 pb-2 border-b ">
                  <div>
                    <h4 className="text-xl font-semibold">Garden Breeze</h4>
                    <span className=" text-gray-500">Room 1</span>
                  </div>
                  <h4 className=" text-primary text-xl font-semibold">
                    N108,000
                    <span className=" font-thin text-black text-sm">
                      /Night
                    </span>
                  </h4>
                </div>
                <div className=" flex items-start justify-between gap-4 pb-2 border-b ">
                  <h4 className="text-lg font-semibold">Amount Details</h4>
                </div>
                <div className=" flex items-start justify-between gap-4 pb-2 border-b  text-gray-500 ">
                  <span className="">Catution Fee</span>
                  <span>N50,000</span>
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
