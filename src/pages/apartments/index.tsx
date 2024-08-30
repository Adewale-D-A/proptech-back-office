import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import ApartmentTable from "../../components/tables/apartments";
import BuildingIcon from "../../assets/icons/building";
import TabView from "../../components/tab";
import AdjustmentIcon from "../../assets/icons/adjustment";
import AmenitiesIcon from "../../assets/icons/amenities";
import ExtraOptionsIcon from "../../assets/icons/extra-options";

const breadCrumb = [
  {
    url: "#",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
];
export default function Apartments() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Apartments",
        pageDescription: "Apartment",
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
        <div>
          <TabView
            header={[
              { id: 1, icon: <BuildingIcon />, label: "Apartment List" },
              { id: 2, icon: <AdjustmentIcon />, label: "Room Options" },
              { id: 3, icon: <AmenitiesIcon />, label: "Amenities" },
              { id: 4, icon: <ExtraOptionsIcon />, label: "Extra Options" },
            ]}
            content={[
              {
                id: 1,
                data: (
                  <ApartmentTable
                    title="Apartment List"
                    header={[
                      "S/N",
                      "Apartment Info",
                      "Price per Night",
                      "Last Booking",
                      "Total Bookings",
                      "Availability Status",
                      "Action",
                    ]}
                    data={[
                      {
                        id: 1,
                        apartmentInfo: {
                          name: "Sunshine -3 Bedroom",
                          image: "/logo_blue.png",
                          location: "Lekki Phase II",
                        },
                        pricePerNight: "N 100,000",
                        lastBooking: "28 Mar, 2014 5:33 AM",
                        totalBookings: "10",
                        availabilityStatus: "Available",
                      },
                      {
                        id: 2,
                        apartmentInfo: {
                          name: "Moonlight - 1 Bedroom",
                          image: "/logo_blue.png",
                          location: "Surulere axis",
                        },
                        pricePerNight: "N 150,000",
                        lastBooking: "29 August, 2024 12:00 AM",
                        totalBookings: "15",
                        availabilityStatus: "Occupied",
                      },
                    ]}
                  />
                ),
              },
              {
                id: 2,
                data: (
                  <div>
                    <h1>Room Options</h1>
                  </div>
                ),
              },
              {
                id: 3,
                data: (
                  <div>
                    <h1>Amenities</h1>
                  </div>
                ),
              },
              {
                id: 4,
                data: (
                  <div>
                    <h1>Extra Options</h1>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
