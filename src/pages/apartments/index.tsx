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
import AmenitiesListsTable from "../../components/tables/amenitiesLists";
import WifiIcon from "../../assets/icons/wifi";
import TvIcon from "../../assets/icons/tv";
import ExtraOptionTable from "../../components/tables/extraOption";
import SecurityIcon from "../../assets/icons/security";
import CheckListIcon from "../../assets/icons/check-list";
import RulesLists from "../../components/tables/rulesLists";
import SafetyAndSecurityList from "../../components/tables/safetyAndSecurityLists";

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
            { id: 5, icon: <SecurityIcon />, label: "Safety and Security" },
            { id: 6, icon: <CheckListIcon />, label: "Rules" },
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
              data: (
                <ExtraOptionTable
                  title="Extra Option List"
                  header={["Name of Option", "Description", "Action"]}
                  data={[
                    {
                      id: 1,
                      categoryName: "Party house",
                      description:
                        "This category represents rooms that are considered party apartments",
                    },
                    {
                      id: 2,
                      categoryName: "Wale olateju apartment",
                      description:
                        "This category represents rooms that are considered party apartments",
                    },
                  ]}
                />
              ),
            },
            {
              id: 5,
              data: (
                <SafetyAndSecurityList
                  title="Safety and Security List"
                  header={["Title", "Description", "Action"]}
                  data={[
                    {
                      id: 1,
                      title: "Security Doors",
                      description: "Security doors closes at 10:30pm",
                    },
                    {
                      id: 2,
                      title: "Visitors",
                      description: "No visitor is allowed to stay past 9:40pm",
                    },
                  ]}
                />
              ),
            },
            {
              id: 6,
              data: (
                <RulesLists
                  title="Rules Lists"
                  header={["Title", "Description", "Action"]}
                  data={[
                    {
                      id: 1,
                      title: "No parties",
                      description: "No parties of any kind allowed",
                    },
                    {
                      id: 2,
                      title: "Music",
                      description: "Music louder than 30Decibel is not allowed",
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
