import { useLayoutEffect } from "react";
import BuildingIcon from "../../../assets/icons/building";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import LocationPinIcon from "../../../assets/icons/location";
import LocationGroupTable from "../../../components/tables/locationGroup";

const breadCrumb = [
  {
    url: "/apartments/view-all",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
  {
    url: "#",
    label: "Location Group",
    icon: <LocationPinIcon />,
  },
];
export default function LocationGroupView() {
  const dispatch = useAppDispatch();
  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Location Group",
        pageDescription: "Apartments location groupings",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);

  return (
    <div className=" w-full flex flex-col gap-4">
      <LocationGroupTable />
    </div>
  );
}
