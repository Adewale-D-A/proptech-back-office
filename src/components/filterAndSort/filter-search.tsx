import { SyntheticEvent, useCallback, useState } from "react";
import FunnelIcon from "../../assets/icons/funnel";
import ModalTemplate from "../modal";
import Select from "../inputs/select";
import LoadingButton from "../button";

export default function FilterSearch() {
  const [channel, setChannel] = useState("");
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [payment, setPayment] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [open, setOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      setOpen(false);
    } catch (error) {
    } finally {
      setIsSearching(false);
    }
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
              options: [
                {
                  id: 1,
                  label: "Website",
                  value: "website",
                },
                {
                  id: 2,
                  label: "Airbnb",
                  value: "airbnb",
                },
                {
                  id: 3,
                  label: "Instagram",
                  value: "instagram",
                },
                {
                  id: 4,
                  label: "Facebook",
                  value: "facebook",
                },
              ],
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
                  label: "Dollar",
                  value: "dollar",
                },
                {
                  id: 2,
                  label: "Naira",
                  value: "naira",
                },
                {
                  id: 3,
                  label: "Pounds",
                  value: "pounds",
                },
              ],
            },
            {
              id: 3,
              name: "filter-by-caterogy",
              defaultLabel: "Filter by Category",
              isRequired: false,
              value: category,
              setValue: setCategory,
              options: [
                {
                  id: 1,
                  label: "1 Bedroom Apartment",
                  value: "1-bed",
                },
                {
                  id: 2,
                  label: "2 Bedroom Apartment",
                  value: "2-bed",
                },
                {
                  id: 3,
                  label: "3 Bedroom Apartment",
                  value: "3-bed",
                },
                {
                  id: 4,
                  label: "4 Bedroom Apartment",
                  value: "4-bed",
                },
              ],
            },
            {
              id: 4,
              name: "filter-by-room-name",
              defaultLabel: "Filter by Room Name",
              isRequired: false,
              value: name,
              setValue: setName,
              options: [
                {
                  id: 1,
                  label: "Sunshine - 2 Bedroom",
                  value: "sunshine-2-bed",
                },
              ],
            },
            {
              id: 5,
              name: "filter-by-payment-method",
              defaultLabel: "Filter by Payment Method",
              isRequired: false,
              value: payment,
              setValue: setPayment,
              options: [
                {
                  id: 1,
                  label: "Bank Transfer",
                  value: "bank-transfer",
                },
                {
                  id: 2,
                  label: "Flutterwave",
                  value: "fluttewave",
                },
                {
                  id: 3,
                  label: "Stripe",
                  value: "stripe",
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
                  label: "Confirmed",
                  value: "confirmed",
                },
                {
                  id: 2,
                  label: "Stand-by",
                  value: "standby",
                },
                {
                  id: 3,
                  label: "Room Closed",
                  value: "room-closed",
                },
                {
                  id: 4,
                  label: "Cancelled",
                  value: "cancelled",
                },
              ],
            },
            {
              id: 7,
              name: "filter-by-date",
              defaultLabel: "Filter by Date",
              isRequired: false,
              value: date,
              setValue: setDate,
              options: [
                {
                  id: 1,
                  label: "Reservation Date",
                  value: "reservation-date",
                },
                {
                  id: 2,
                  label: "Check-in Date",
                  value: "check-in-date",
                },
                {
                  id: 3,
                  label: "Check-out Date",
                  value: "Check-out Date",
                },
              ],
            },
          ].map((section) => (
            <Select
              key={section?.id}
              isRequired={section.isRequired}
              value={section?.value}
              setValue={section?.setValue}
              id={section?.name}
            >
              <option value="">{section?.defaultLabel}</option>
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
