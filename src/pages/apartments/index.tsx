import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../stores/hooks";
import { updatePageProperties } from "../../stores/appFunctionality/pageProperties";
import BuildingIcon from "../../assets/icons/building";
import ApartmentListsTable from "../../components/tables/apartmentLists";

const breadCrumb = [
  {
    url: "#",
    label: "Apartments",
    icon: <BuildingIcon />,
  },
];
export default function ApartmentsListView() {
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
    <div className="w-full">
      <ApartmentListsTable />
    </div>
  );
}
