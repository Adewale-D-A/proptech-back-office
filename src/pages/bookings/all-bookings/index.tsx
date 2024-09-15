import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { useLayoutEffect } from "react";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import CalendarIcon from "../../../assets/icons/calendar";
import LinkButton from "../../../components/button/linkButton";
import PlusIcon from "../../../assets/icons/plus";
import AllBookingsListTable from "../../../components/tables/allBookingsLists";
import ExportSelect from "../../../components/inputs/select/exportSelect";

const breadCrumb = [
  {
    url: "/bookings",
    label: "Bookings",
    icon: <CalendarIcon />,
  },
  {
    url: "#",
    label: "All Bookings",
    icon: "",
  },
];
export default function AllBookings() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "All Bookings",
        pageDescription: "All bookings",
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
        <div className=" w-full flex justify-between">
          <h2 className="text-xl font-semibold">All Bookings List</h2>
          <div className=" flex items-center gap-4">
            <ExportSelect />
            <LinkButton
              url="#"
              label="Add New Booking"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>
        <div>
          <AllBookingsListTable
            header={[
              "ID",
              "Customer Name",
              "Apartment Name",
              "Date of Booking",
              "Amount",
              "Exchange Rate",
              "Check-in Date",
              "Check-out Date",
              "Status",
              "Action",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
