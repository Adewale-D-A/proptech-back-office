import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hooks";
import { useLayoutEffect, useState } from "react";
import { updatePageProperties } from "../../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../../assets/icons/calendar";
import Status from "../../../../components/status";
import Search from "../../../../components/inputs/search";
import LoadingButton from "../../../../components/button";
import PlusIcon from "../../../../assets/icons/plus";
import Select from "../../../../components/inputs/select";
import BookingTab from "../../../../components/tab/bookingTab";
import MenuIcon from "../../../../assets/icons/menu";
import AdminNotes from "./notes/page";
import GuestMessaging from "./guest-messaging/page";
import InvoiceNotes from "./invoice-notes/page";
import BookingHistory from "./booking-history/page";
import BookingByIdList from "../../../../components/tables/bookingList";

const breadCrumb = [
  {
    url: "/bookings",
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

  return (
    <section className="w-full flex flex-col items-center my-5">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <div className=" p-3 rounded-lg border">
          <BookingByIdList />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5 items-start">
          <div className=" w-full flex-1 md:flex-[0.4]">
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
                    <LoadingButton
                      isLoading={false}
                      label="Create new Customer"
                      startIcon={<PlusIcon />}
                      type="button"
                      variant={2}
                    />
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
            <BookingTab
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
