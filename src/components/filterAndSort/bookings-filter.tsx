import { SyntheticEvent, useCallback, useState } from "react";
import FunnelIcon from "../../assets/icons/funnel";
import ModalTemplate from "../modal";
import Select from "../inputs/select";
import LoadingButton from "../button";
import { BookingFilterPayload } from "../../types/apiData/bookings/booking-filter-options";
import paymentOptions from "../../config/payment-options.json";
import salesChannels from "../../config/sales-channels.json";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function BookingsFilterSearch({
  setData,
}: {
  setData?: (payload: BookingFilterPayload) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [channel, setChannel] = useState("");
  const [userVerification, setUserVerification] = useState("");
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [payment, setPayment] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [open, setOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setIsSearching(true);
      try {
        const payload = {
          channel,
          currency,
          room_option: category,
          payment_method: payment,
          status,
          user_verification: userVerification,
        };
        setData?.(payload);
        let queries: { [key: string]: string } = {};
        searchParams.forEach((value, key) => {
          queries[key] = value;
        });
        const params = new URLSearchParams(queries);
        params.set("channel", channel);
        params.set("currency", currency);
        params.set("room_option", category);
        params.set("payment_method", payment);
        params.set("status", status);
        params.set("user_verification", userVerification);
        navigate(location.pathname + "?" + params.toString());
        setOpen(false);
      } catch (error) {
      } finally {
        setIsSearching(false);
      }
    },
    [channel, currency, category, payment, status, userVerification]
  );

  const clearFilter = useCallback(() => {
    setData?.({
      channel: "",
      currency: "",
      room_option: "",
      payment_method: "",
      status: "",
      user_verification: "",
    });
    setChannel("");
    setCurrency("");
    setCategory("");
    setName("");
    setPayment("");
    setStatus("");
    setDate("");
    setUserVerification("");
    let queries: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      queries[key] = value;
    });
    const params = new URLSearchParams(queries);
    params.set("channel", "");
    params.set("currency", "");
    params.set("room_option", "");
    params.set("payment_method", "");
    params.set("status", "");
    params.set("user_verification", "");
    navigate(location.pathname + "?" + params.toString());
    setOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" flex items-center p-3 px-6 rounded-full border border-primary text-primary"
      >
        <span>Filter Search </span> <FunnelIcon />
      </button>

      <ModalTemplate
        open={open}
        setOpen={setOpen}
        className={"max-w-md"}
        title={"Filter your Search"}
        showXicon={true}
      >
        <form onSubmit={handleSearch} className="w-full flex flex-col gap-4">
          {[
            {
              id: 1,
              name: "filter-by-channel",
              defaultLabel: "Filter by Channel",
              isRequired: false,
              value: channel,
              setValue: setChannel,
              options: salesChannels,
            },
            {
              id: 2,
              name: "filter-by-currency",
              defaultLabel: "Filter by Currency",
              isRequired: false,
              value: currency,
              setValue: setCurrency,
              options: [
                {
                  id: 1,
                  label: "USD",
                  value: "USD",
                },
                {
                  id: 2,
                  label: "NGN",
                  value: "NGN",
                },
              ],
            },
            {
              id: 3,
              name: "filter-by-category",
              defaultLabel: "Filter by Category",
              isRequired: false,
              value: category,
              setValue: setCategory,
              options: Array.from({ length: 8 }, (_, index) => ({
                id: index + 1,
                label: `${index + 1} Bed`,
                value: `${index + 1}`,
              })),
            },
            // {
            //   id: 4,
            //   name: "filter-by-room-name",
            //   defaultLabel: "Filter by Room Name",
            //   isRequired: false,
            //   value: name,
            //   setValue: setName,
            //   options: [
            //     {
            //       id: 1,
            //       label: "Sunshine - 2 Bedroom",
            //       value: "sunshine-2-bed",
            //     },
            //   ],
            // },
            {
              id: 5,
              name: "filter-by-payment-method",
              defaultLabel: "Filter by Payment Method",
              isRequired: false,
              value: payment,
              setValue: setPayment,
              options: paymentOptions,
            },
            {
              id: 7,
              name: "filter-by-user-verification",
              defaultLabel: "Filter by User Verification",
              isRequired: false,
              value: userVerification,
              setValue: setUserVerification,
              options: [
                {
                  id: 1,
                  label: "Verified",
                  value: "yes",
                },
                {
                  id: 2,
                  label: "Unverified",
                  value: "no",
                },
              ],
            },
            {
              id: 6,
              name: "filter-by-status",
              defaultLabel: "Filter by Status",
              isRequired: false,
              value: status,
              setValue: setStatus,
              options: [
                {
                  id: 1,
                  label: "Awaiting Payment",
                  value: "Awaiting Payment",
                },
                // {
                //   id: 1,
                //   label: "Confirmed",
                //   value: "confirmed",
                // },
                // {
                //   id: 2,
                //   label: "Stand-by",
                //   value: "standby",
                // },
                // {
                //   id: 3,
                //   label: "Room Closed",
                //   value: "room-closed",
                // },
                // {
                //   id: 4,
                //   label: "Cancelled",
                //   value: "cancelled",
                // },
              ],
            },
            // {
            //   id: 7,
            //   name: "filter-by-date",
            //   defaultLabel: "Filter by Date",
            //   isRequired: false,
            //   value: date,
            //   setValue: setDate,
            //   options: [
            //     {
            //       id: 1,
            //       label: "Reservation Date",
            //       value: "reservation-date",
            //     },
            //     {
            //       id: 2,
            //       label: "Check-in Date",
            //       value: "check-in-date",
            //     },
            //     {
            //       id: 3,
            //       label: "Check-out Date",
            //       value: "Check-out Date",
            //     },
            //   ],
            // },
          ].map((section) => (
            <Select
              key={section?.id}
              isRequired={false}
              value={section?.value}
              setValue={section?.setValue}
              id={section?.name}
            >
              <option value="" disabled>
                {section?.defaultLabel}
              </option>
              {section?.options?.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
          ))}
          <div className=" flex items-center gap-5">
            <LoadingButton
              type="button"
              label="Cancel"
              variant={2}
              disabled={false}
              isLoading={false}
              clickHandler={() => setOpen(false)}
            />

            <LoadingButton
              type="button"
              label="Clear Filter"
              variant={2}
              disabled={false}
              isLoading={false}
              clickHandler={() => clearFilter()}
            />
            <LoadingButton
              type="submit"
              label="Search"
              disabled={false}
              isLoading={isSearching}
            />
          </div>
        </form>
      </ModalTemplate>
    </>
  );
}
