import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import BookingTab from "../../components/tab/bookingTab";
import AdditionIcon from "../../assets/icons/addtion";
import AdditionalServicesList from "./services-list";
import StallIcon from "../../assets/icons/stall";
import DoorIcon from "../../assets/icons/door";
import VendorServicesList from "./vendor-services";

const breadCrumb = [
  {
    url: "#",
    label: "Additional Services",
    icon: <AdditionIcon />,
  },
];
export default function Bookings() {
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Additional Services",
        pageDescription: "Additional services",
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
        <BookingTab
          header={[
            { id: 1, icon: <DoorIcon />, label: "99 Apartment Services" },
            { id: 2, icon: <StallIcon />, label: "Vendor Services" },
          ]}
          content={[
            {
              id: 1,
              data: <AdditionalServicesList />,
            },
            {
              id: 2,
              data: <VendorServicesList />,
            },
          ]}
        />
      </div>
    </section>
  );
}
