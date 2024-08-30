import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import BuildingIcon from "../../assets/icons/building";
import AdjustmentIcon from "../../assets/icons/adjustment";
import AmenitiesIcon from "../../assets/icons/amenities";
import ExtraOptionsIcon from "../../assets/icons/extra-options";
import ApartmentListsTable from "../../components/tables/apartmentLists";
import ApartmentTab from "../../components/tab/apartmentTab";
import RoomOptionTable from "../../components/tables/roomOption";
import AmenitiesListsTable from "../../components/tables/amenitiesLisits";
import WifiIcon from "../../assets/icons/wifi";
import TvIcon from "../../assets/icons/tv";

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
        <ApartmentTab
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
                <ApartmentListsTable
                  title="Apartment List"
                  header={[
                    "Apartment Name",
                    "No of Guests",
                    "Category",
                    "Characteristics",
                    "Units",
                    "Status",
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
                      noOfGuests: "4",
                      category: "2 Bedroom Apartment",
                      characteristics: "3",
                      units: "1",
                      status: "Available",
                    },
                    {
                      id: 2,
                      apartmentInfo: {
                        name: "Moonlight - 1 Bedroom",
                        image: "/logo_blue.png",
                        location: "Surulere axis",
                      },
                      noOfGuests: "2",
                      category: "3 Bedroom Apartment",
                      characteristics: "4",
                      units: "1",
                      status: "Not Available",
                    },
                  ]}
                />
              ),
            },
            {
              id: 2,
              data: (
                <RoomOptionTable
                  title="Room Options List"
                  header={["Category Name", "Description", "Action"]}
                  data={[
                    {
                      id: 1,
                      categoryName: "1 Bedroom Apartment",
                      description: "This is a one bedroom apartment",
                    },
                    {
                      id: 2,
                      categoryName: "2 Bedroom Apartment",
                      description: "This is a two bedroom apartment",
                    },
                  ]}
                />
              ),
            },
            {
              id: 3,
              data: (
                <AmenitiesListsTable
                  title="Amenities List"
                  header={["Amenities Name", "Icon", "Text", "Action"]}
                  data={[
                    {
                      id: 1,
                      amentiesName: "Television",
                      icon: <TvIcon />,
                      text: "This icon represents a Television",
                    },
                    {
                      id: 2,
                      amentiesName: "internet",
                      icon: <WifiIcon />,
                      text: "This icon represents a Television",
                    },
                  ]}
                />
              ),
            },
            {
              id: 4,
              data: <div></div>,
            },
          ]}
        />
      </div>
    </section>
  );
}
