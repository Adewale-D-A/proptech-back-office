import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../../assets/icons/calendar";
import Search from "../../../../components/inputs/search";
import PlusIcon from "../../../../assets/icons/plus";
import Select from "../../../../components/inputs/select";
import MenuIcon from "../../../../assets/icons/menu";
import AdminNotes from "./notes/page";
import GuestMessaging from "./guest-messaging/page";
import InvoiceNotes from "./invoice-notes/page";
import BookingHistory from "./booking-history/page";
import BookingByIdList from "../../../../components/tables/bookingList";
import useGetBookingById from "../../../../services-hooks/bookings/useGetBookingById";
import useGetCustomerById from "../../../../services-hooks/useGetCustomerById";
import CustomTab from "../../../../components/tab";

const breadCrumb = [
  {
    url: "/bookings/overview",
    label: "Bookings",
    icon: <CalendarIcon />,
  },
  {
    url: "#",
    label: "Administration",
    icon: "",
  },
];
export default function BookingAdministrationById() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Bookings Details Administration",
        pageDescription: "Bookings details administration",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  const [payment, setPayment] = useState("");
  const { data, isFailed, setIsFailed, isLoading } = useGetBookingById(id);
  const { data: user } = useGetCustomerById(String(data?.user_id || ""));

  return (
    <section className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" p-3 rounded-lg border">
          <BookingByIdList data={data} />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5 items-start">
          <div className=" w-full flex-1 md:flex-[0.4] flex flex-col gap-3">
            <div className=" w-full flex flex-col gap-4 border rounded-md">
              {/* Assign Customer */}
              <h4 className="text-lg font-semibold border-b p-3">
                Assign Customer
              </h4>
              <div className=" p-3 flex flex-col gap-2">
                <label htmlFor="search-pin-name">Exisiting Customer</label>
                <Search
                  id="search-pin-name"
                  placeholder="Search by PIN or Name"
                />
                <div className=" flex justify-end">
                  <div className=" w-fit">
                    <Link
                      to={"/add-customer/customer-details"}
                      className="w-full flex justify-center p-3 px-6 rounded-full transition-all border hover:border-primary/60 border-primary text-primary"
                    >
                      {" "}
                      <PlusIcon /> <span>Create new Customer</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full flex flex-col gap-4 border rounded-md">
              {/* Method of payment */}
              <h4 className="text-lg font-semibold border-b p-3">
                Method of Payment
              </h4>
              <div className=" p-3 flex flex-col gap-2">
                <Select
                  isRequired={true}
                  value={payment}
                  setValue={setPayment}
                  id="method-of-payment"
                  label="Payment Method"
                >
                  <option value="">Flutterwave</option>
                  <option value="bank-transfer">Bank Transfer</option>
                </Select>
              </div>
            </div>
          </div>
          <div className=" w-full flex-1 md:flex-[0.6] rounded-md border flex flex-col gap-3">
            <CustomTab
              header={[
                { id: 1, icon: <MenuIcon />, label: "Notes" },
                { id: 2, icon: <MenuIcon />, label: "Guest Messaging" },
                { id: 3, icon: <MenuIcon />, label: "Invoice Note" },
                { id: 4, icon: <MenuIcon />, label: "Booking History" },
              ]}
              content={[
                {
                  id: 1,
                  data: <AdminNotes />,
                },
                {
                  id: 2,
                  data: <GuestMessaging />,
                },
                {
                  id: 3,
                  data: <InvoiceNotes />,
                },
                {
                  id: 4,
                  data: <BookingHistory />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
